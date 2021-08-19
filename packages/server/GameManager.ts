import WebSocket from 'ws'
import {
  ClientAction,
  Game,
  gameCreator,
  hostActions
} from '@dune-companion/engine'
import { GameRoom } from './GameRoom'
import { createActionSender } from './utils/createActionSender'
import { IDataStore } from './types'

type GameManagerDependencies = {
  idGenerator: () => string
  dataStore: IDataStore<Game>
}

export class GameManager {
  private readonly rooms: Record<string, GameRoom> = {}
  private readonly idGenerator: () => string
  private readonly dataStore: IDataStore<Game>

  constructor({ idGenerator, dataStore }: GameManagerDependencies) {
    this.idGenerator = idGenerator
    this.dataStore = dataStore
  }

  async handleConnection(socket: WebSocket, connectionUrl?: string) {
    const actionSender = createActionSender(socket)
    const clientId = connectionUrl?.split('=')[1] || this.idGenerator()
    console.log(`Client ${clientId} connected.`)

    // Send back the generated clientId to client.
    await actionSender(hostActions.CLIENT_CONNECTED({ clientId }))

    socket.on('message', async message => {
      const { type, payload } = JSON.parse(message.toString('utf-8'))
      if (type === 'CREATE_GAME') {
        this.create({ ...payload, socket })
      } else if (type === 'JOIN_GAME') {
        this.join({ ...payload, socket })
      }
    })
  }

  async create({
    socket,
    roomId,
    password,
    playerId,
    conditions
  }: {
    socket: WebSocket
  } & ClientAction<'CREATE_GAME'>['payload']): Promise<void> {
    const actionSender = createActionSender(socket)
    if (this.has(roomId)) {
      return actionSender(
        hostActions.SHOW_NOTIFICATION({
          message: `Room with id ${roomId} already exists.`,
          type: 'info'
        })
      )
    }

    console.log(`Client ${playerId} created room ${roomId}.`)
    const initialGameState =
      (await this.dataStore.get(roomId)) ?? gameCreator(conditions)

    this.rooms[roomId] = new GameRoom({
      initialGameState,
      password,
      persistGame: game => this.dataStore.persist(roomId, game)
    })

    await this.rooms[roomId].create({
      conditions,
      roomId,
      password,
      playerId,
      socket
    })
    await actionSender(hostActions.GAME_CREATED({ roomId }))
    socket.on('close', async () => await this.leave(roomId, playerId))
    socket.on('message', message => {
      const action = JSON.parse(message.toString('utf8'))
      this.rooms[roomId].updateGame(action)
    })
  }

  async join({
    playerId,
    password,
    roomId,
    socket
  }: {
    socket: WebSocket
  } & ClientAction<'JOIN_GAME'>['payload']): Promise<void> {
    const actionSender = createActionSender(socket)
    if (!this.has(roomId)) {
      return await actionSender(
        hostActions.SHOW_NOTIFICATION({
          message: `Room with id ${roomId} does not exist.`,
          type: 'info'
        })
      )
    }

    if (!this.rooms[roomId].validatePassword(password)) {
      return await actionSender(
        hostActions.SHOW_NOTIFICATION({
          message: 'Incorrect password.',
          type: 'error'
        })
      )
    }

    if (this.rooms[roomId].hasClient(playerId)) {
      console.log(`Client ${playerId} rejoining room ${roomId}.`)
      return await actionSender(hostActions.GAME_JOINED({ roomId }))
    }

    this.rooms[roomId].join({ roomId, password, playerId, socket })
    await actionSender(hostActions.GAME_JOINED({ roomId }))

    socket.on('close', async () => await this.leave(roomId, playerId))
    socket.on('message', message => {
      const action = JSON.parse(message.toString('utf8'))
      this.rooms[roomId].updateGame(action)
    })
  }

  async leave(roomId: string, clientId: string): Promise<void> {
    if (!this.has(roomId)) {
      return console.error(`No room exists with id: ${roomId}.`)
    }

    console.log(`Client connection ${clientId} removed from room ${roomId}.`)
    this.rooms[roomId].removeClient(clientId)

    if (this.rooms[roomId].size === 0) {
      console.log(`Room ${roomId} is empty and is being closed.`)
      await this.dataStore.remove(roomId)
      delete this.rooms[roomId]
    }
  }

  private has(roomId: string) {
    return Boolean(this.rooms[roomId])
  }
}
