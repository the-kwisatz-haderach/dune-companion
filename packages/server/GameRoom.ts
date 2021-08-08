import WebSocket from 'ws'
import {
  initialGameState,
  PlayerAction,
  gameReducer,
  Game,
  playerActions
} from '../engine/src'

export class GameRoom {
  private readonly clients: Record<string, WebSocket>
  private game: Game

  constructor() {
    this.clients = {}
    this.game = initialGameState
  }

  get size() {
    return Object.keys(this.clients).length
  }

  async updateGame(action: PlayerAction): Promise<void> {
    this.game = gameReducer(this.game, action)
    this.broadcastGameState()
  }

  async broadcastGameState() {
    await Promise.all(
      this.getClients().map(async socket => {
        socket.send(JSON.stringify(this.game))
      })
    )
  }

  addClient(clientId: string, socket: WebSocket) {
    if (this.clients[clientId]) return
    this.clients[clientId] = socket
    this.updateGame(
      playerActions.JOIN_GAME({
        playerId: clientId,
        isAdmin: this.size === 1
      }) as any
    )
  }

  removeClient(clientId: string) {
    if (this.clients[clientId]) {
      delete this.clients[clientId]
      this.updateGame(playerActions.LEAVE_GAME({ playerId: clientId }) as any)
    }
  }

  getClients(): WebSocket[] {
    return Object.values(this.clients)
  }
}
