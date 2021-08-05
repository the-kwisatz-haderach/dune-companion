import WebSocket from 'ws'
import { RedisClient } from 'redis'
import { initialGameState, PlayerAction, gameReducer } from '../engine/src'

export class GameRoom {
  private readonly clients: Record<string, WebSocket>
  private readonly id: string
  private readonly gameCache: RedisClient

  constructor(id: string, gameCache: RedisClient) {
    this.gameCache = gameCache
    this.id = id
    this.clients = {}
    this.gameCache.set(this.id, JSON.stringify(initialGameState))
  }

  get size() {
    return Object.keys(this.clients).length
  }

  async updateGame(action: PlayerAction): Promise<void> {
    this.gameCache.get(this.id, async (err, reply) => {
      if (err) {
        console.error('Error while reading from cache')
        console.error(err)
      } else if (reply) {
        try {
          const updatedGame = gameReducer(JSON.parse(reply), action)
          this.gameCache.set(this.id, JSON.stringify(updatedGame))
          await Promise.all(
            this.getClients().map(async socket => {
              socket.send(JSON.stringify(updatedGame))
            })
          )
        } catch (err) {
          console.error('Error while updating game')
          console.error(err)
        }
      }
    })
  }

  addClient(clientId: string, socket: WebSocket) {
    if (this.clients[clientId]) return
    this.clients[clientId] = socket
  }

  removeClient(clientId: string) {
    if (this.clients[clientId]) {
      delete this.clients[clientId]
    }
  }

  getClients(): WebSocket[] {
    return Object.values(this.clients)
  }
}
