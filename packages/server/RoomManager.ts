import { RedisClient } from 'redis'
import WebSocket from 'ws'
import { GameRoom } from './GameRoom'

export class RoomManager {
  private readonly rooms: Record<string, GameRoom> = {}
  private readonly subscriber: RedisClient
  private readonly publisher: RedisClient

  constructor(subscriber: RedisClient, publisher: RedisClient) {
    this.subscriber = subscriber
    this.publisher = publisher
    this.subscriber.on('message', async (roomId, message) => {
      const action = JSON.parse(message)
      console.log('Incoming action with payload: ', action)
      this.rooms[roomId].updateGame(action)
    })
  }

  join(roomId: string, clientId: string, socket: WebSocket): void {
    this.subscriber.subscribe(roomId)
    if (!this.has(roomId)) {
      this.rooms[roomId] = new GameRoom()
    }
    const room = this.rooms[roomId]
    room.addClient(clientId, socket)

    // Send back the generated clientId to client.
    socket.send(
      JSON.stringify({ type: 'CONNECTION', payload: { playerId: clientId } })
    )

    socket.on('message', message =>
      this.publisher.publish(roomId, message.toString('utf-8'))
    )
  }

  leave(roomId: string, clientId: string): void {
    if (!this.has(roomId)) {
      return console.error(`No room exists with id: ${roomId}.`)
    }
    const room = this.rooms[roomId]
    room.removeClient(clientId)
    if (room.size === 0) {
      delete this.rooms[roomId]
      this.subscriber.unsubscribe(roomId)
    }
  }

  private has(roomId: string) {
    return Boolean(this.rooms[roomId])
  }
}
