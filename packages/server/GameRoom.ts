import WebSocket from 'ws'
import {
  ClientActionType,
  clientActions,
  gameReducer,
  Game,
  Conditions,
  gameCreator,
  joinGame,
  hostActions
} from '@dune-companion/engine'

export class GameRoom {
  private readonly clients: Record<string, WebSocket>
  private game: Game
  private readonly password?: string

  constructor(conditions: Conditions, password?: string) {
    this.clients = {}
    this.password = password
    this.game = gameCreator(conditions)
  }

  validatePassword(password?: string) {
    return this.password === undefined || this.password === password
  }

  get size() {
    return Object.keys(this.clients).length
  }

  async updateGame(
    action: ReturnType<typeof clientActions[ClientActionType]>
  ): Promise<void> {
    this.game = gameReducer(this.game, action)
    this.broadcastMessage(hostActions.UPDATE_GAME({ game: this.game }))
  }

  async broadcastMessage<T extends Record<string, unknown>>(message: T) {
    await Promise.all(
      this.getClients().map(async socket => {
        socket.send(JSON.stringify(message))
      })
    )
  }

  addClient({
    socket,
    ...payload
  }: { socket: WebSocket } & ReturnType<typeof joinGame>['payload']) {
    if (this.clients[payload.playerId]) return
    this.clients[payload.playerId] = socket
    socket.send(
      JSON.stringify(hostActions.GAME_JOINED({ roomId: payload.roomId }))
    )
    console.log(`Client ${payload.playerId} joined room ${payload.roomId}.`)
    this.updateGame(clientActions.JOIN_GAME(payload))
  }

  removeClient(clientId: string) {
    if (this.clients[clientId]) {
      delete this.clients[clientId]
      this.updateGame(clientActions.LEAVE_GAME({ playerId: clientId }))
    }
  }

  getClients(): WebSocket[] {
    return Object.values(this.clients)
  }
}
