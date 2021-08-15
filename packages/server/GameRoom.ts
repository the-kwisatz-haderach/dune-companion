import WebSocket from 'ws'
import {
  ClientActionType,
  clientActions,
  gameReducer,
  Game,
  Conditions,
  gameCreator,
  joinGame,
  hostActions,
  HostActionType
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
    this.broadcastMessage(hostActions.GAME_UPDATED({ game: this.game }))
  }

  async broadcastMessage<T extends Record<string, unknown>>(message: T) {
    await Promise.all(
      this.getClients().map(async socket => {
        socket.send(JSON.stringify(message))
      })
    )
  }

  async addClient({
    socket,
    ...payload
  }: { socket: WebSocket } & ReturnType<typeof joinGame>['payload']) {
    const actionSender = this.createActionSender(socket)
    if (this.clients[payload.playerId]) {
      return await actionSender('GAME_JOINED', { roomId: payload.roomId })
    }
    if (this.size >= this.game.conditions.maxPlayers) {
      return await actionSender('SHOW_NOTIFICATION', {
        message: 'Game room is already full.',
        type: 'info'
      })
    }

    this.clients[payload.playerId] = socket
    await actionSender('GAME_JOINED', { roomId: payload.roomId })
    console.log(`Client ${payload.playerId} joined room ${payload.roomId}.`)
    this.updateGame(clientActions.JOIN_GAME(payload))
  }

  removeClient(clientId: string) {
    if (this.clients[clientId]) {
      delete this.clients[clientId]
      this.updateGame(clientActions.LEAVE_GAME({ playerId: clientId }))
    }
  }

  private createActionSender(socket: WebSocket) {
    return async <T extends HostActionType>(
      type: T,
      payload: ReturnType<typeof hostActions[T]>['payload']
    ) => socket.send(JSON.stringify(hostActions[type](payload as any)))
  }

  private getClients(): WebSocket[] {
    return Object.values(this.clients)
  }
}
