import { RedisClient } from 'redis'
import WebSocket from 'ws'
import { createGame, hostActions, joinGame } from '@dune-companion/engine'
import { GameRoom } from './GameRoom'

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

  handleConnection(socket: WebSocket, connectionUrl?: string) {
    const clientId = connectionUrl?.split('=')[1] || this.idGenerator()
    console.log(`Client ${clientId} connected.`)

    // Send back the generated clientId to client.
    socket.send(
      JSON.stringify({ type: 'CONNECTION', payload: { playerId: clientId } })
    )

    socket.on('message', message => {
      const { type, payload } = JSON.parse(message.toString('utf-8'))
      if (type === 'CREATE_GAME') {
        this.create({ ...payload, socket })
      } else if (type === 'JOIN_GAME') {
        this.join({ ...payload, socket })
      }
    })
  }

  create({
    socket,
    roomId,
    password,
    playerId,
    conditions
  }: {
    socket: WebSocket
  } & ReturnType<typeof createGame>['payload']) {
    if (this.has(roomId)) {
      return socket.close(1000, `Room with id ${roomId} already exists.`)
    }

    console.log(`Client ${playerId} created room ${roomId}.`)
    this.rooms[roomId] = new GameRoom(conditions, password)
    this.rooms[roomId].addClient({ roomId, password, playerId, socket })
    socket.send(JSON.stringify(hostActions.GAME_CREATED({ roomId })))
    this.subscriber.subscribe(roomId)

    socket.on('close', () => this.leave(roomId, playerId))
    socket.on('message', message =>
      this.publisher.publish(roomId, message.toString('utf-8'))
    )
  }

  join({
    playerId,
    password,
    roomId,
    socket
  }: {
    socket: WebSocket
  } & ReturnType<typeof joinGame>['payload']): void {
    if (!this.has(roomId)) {
      return socket.send(
        JSON.stringify(
          hostActions.SHOW_ERROR({
            message: `Room with id ${roomId} does not exist.`
          })
        )
      )
    }

    if (!this.rooms[roomId].validatePassword(password)) {
      return socket.send(
        JSON.stringify(
          hostActions.SHOW_ERROR({
            message: 'Incorrect password.'
          })
        )
      )
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
