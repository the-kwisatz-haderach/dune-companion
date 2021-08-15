import { RedisClient } from 'redis'
import WebSocket from 'ws'
import { createGame, joinGame } from '@dune-companion/engine'
import { GameRoom } from './GameRoom'
import { createActionSender } from './utils/createActionSender'

export class GameManager {
  private readonly rooms: Record<string, GameRoom> = {}
  private readonly subscriber: RedisClient
  private readonly publisher: RedisClient
  private readonly idGenerator: () => string

  constructor({
    subscriber,
    publisher,
    idGenerator
  }: {
    subscriber: RedisClient
    publisher: RedisClient
    idGenerator: () => string
  }) {
    this.subscriber = subscriber
    this.publisher = publisher
    this.idGenerator = idGenerator
    this.subscriber.on('message', async (roomId, message) => {
      const action = JSON.parse(message)
      this.rooms[roomId].updateGame(action)
    })
  }

  async handleConnection(socket: WebSocket, connectionUrl?: string) {
    const actionSender = createActionSender(socket)
    const clientId = connectionUrl?.split('=')[1] || this.idGenerator()
    console.log(`Client ${clientId} connected.`)

    // Send back the generated clientId to client.
    await actionSender('CLIENT_CONNECTED', { clientId })

    socket.on('message', message => {
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
  } & ReturnType<typeof createGame>['payload']): Promise<void> {
    const actionSender = createActionSender(socket)
    if (this.has(roomId)) {
      return actionSender('SHOW_NOTIFICATION', {
        message: `Room with id ${roomId} already exists.`,
        type: 'info'
      })
    }

    console.log(`Client ${playerId} created room ${roomId}.`)
    this.rooms[roomId] = new GameRoom(conditions, password)
    this.rooms[roomId].addClient({ roomId, password, playerId, socket })
    await actionSender('GAME_CREATED', { roomId })
    this.subscriber.subscribe(roomId)

    socket.on('close', () => this.leave(roomId, playerId))
    socket.on('message', message =>
      this.publisher.publish(roomId, message.toString('utf-8'))
    )
  }

  async join({
    playerId,
    password,
    roomId,
    socket
  }: {
    socket: WebSocket
  } & ReturnType<typeof joinGame>['payload']): Promise<void> {
    const actionSender = createActionSender(socket)
    if (!this.has(roomId)) {
      return await actionSender('SHOW_NOTIFICATION', {
        message: `Room with id ${roomId} does not exist.`,
        type: 'info'
      })
    }

    if (!this.rooms[roomId].validatePassword(password)) {
      return await actionSender('SHOW_NOTIFICATION', {
        message: 'Incorrect password.',
        type: 'error'
      })
    }

    if (this.rooms[roomId].hasClient(playerId)) {
      console.log(`Client ${playerId} rejoining room ${roomId}.`)
      return await actionSender('GAME_JOINED', { roomId })
    }

    this.rooms[roomId].addClient({ roomId, password, playerId, socket })

    socket.on('close', () => this.leave(roomId, playerId))
    socket.on('message', message =>
      this.publisher.publish(roomId, message.toString('utf-8'))
    )
  }

  leave(roomId: string, clientId: string): void {
    if (!this.has(roomId)) {
      return console.error(`No room exists with id: ${roomId}.`)
    }

    console.log(`Client connection ${clientId} removed from room ${roomId}.`)
    this.rooms[roomId].removeClient(clientId)

    if (this.rooms[roomId].size === 0) {
      console.log(`Room ${roomId} is empty and is being closed.`)
      delete this.rooms[roomId]
      this.subscriber.unsubscribe(roomId)
    }
  }

  private has(roomId: string) {
    return Boolean(this.rooms[roomId])
  }
}
