import WebSocket from 'ws'
import {
  ClientAction,
  CREATE_GAME,
  Game,
  gameCreator,
  hostActions,
  JOIN_GAME
} from '@dune-companion/engine'
import { GameRoom } from './GameRoom'
import { createActionSender } from '../utils/createActionSender'
import { IDataStore } from '../types'

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

  async handleConnection(
    socket: WebSocket,
    connectionUrl?: string
  ): Promise<void> {
    const actionSender = createActionSender(socket)
    const clientId = connectionUrl?.split('=')[1] || this.idGenerator()
    console.log(`Client ${clientId} connected.`)

    // Send back the generated clientId to client.
    await actionSender(hostActions.CLIENT_CONNECTED({ clientId }))

    socket
      .on('message', async (message) => {
        const { type, payload } = JSON.parse(message.toString('utf-8'))
        if (type === CREATE_GAME) {
          this.create({ ...payload, socket })
        } else if (type === JOIN_GAME) {
          this.join({ ...payload, socket })
        }
      })
      .on('close', () => console.log(`Client ${clientId} disconnected.`))
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
    try {
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
      const cachedGameState = await this.dataStore.get(roomId)
      if (cachedGameState) {
        console.log(`Serving cached game state for room ${roomId}.`)
      }
      const initialGameState = cachedGameState ?? gameCreator(conditions)

      this.rooms[roomId] = new GameRoom({
        initialGameState,
        password,
        persistGame: (game) => this.dataStore.persist(roomId, game)
      })

      await this.rooms[roomId].create({
        conditions,
        roomId,
        password,
        playerId,
        socket
      })
      await actionSender(hostActions.GAME_CREATED({ roomId }))
      this.registerListeners({ socket, roomId, playerId })
    } catch (err) {
      console.error(err)
    }
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

    this.registerListeners({ socket, roomId, playerId })
    await this.rooms[roomId].join({ roomId, password, playerId, socket })
    await actionSender(hostActions.GAME_JOINED({ roomId }))
  }

  async leave({
    playerId,
    roomId
  }: ClientAction<'LEAVE_GAME'>['payload']): Promise<void> {
    try {
      if (!this.has(roomId)) return
      await this.rooms[roomId].leave({ playerId, roomId })
      if (!this.rooms[roomId]?.size) {
        console.log(`Room ${roomId} is empty and is being closed.`)
        await this.dataStore.remove(roomId)
        delete this.rooms[roomId]
      }
    } catch (err) {
      console.error(err)
    }
  }

  private has(roomId: string) {
    return Boolean(this.rooms[roomId])
  }

  private registerListeners({
    socket,
    roomId,
    playerId
  }: {
    socket: WebSocket
    roomId: string
    playerId: string
  }) {
    socket.on('close', () => this.leave({ playerId, roomId }))
    socket.on('message', (message) => {
      if (!this.has(roomId)) return
      const action = JSON.parse(message.toString('utf8'))
      this.rooms[roomId].updateGame(action)
    })
  }
}
