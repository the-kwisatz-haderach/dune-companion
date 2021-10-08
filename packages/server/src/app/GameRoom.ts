import WebSocket from 'ws'
import {
  applyMiddleware,
  createStore,
  Middleware,
  Store
} from '@reduxjs/toolkit'
import {
  clientActions,
  rootReducer,
  Game,
  hostActions,
  ClientAction,
  HostAction
} from '@dune-companion/engine'
import { createActionSender } from '../utils/createActionSender'

const createPersistStateMiddleware =
  (persistGame: (game: Game) => Promise<void>): Middleware<any, Game> =>
  ({ getState }) =>
  (next) =>
  async (action) => {
    const result = next(action)
    const state = getState()
    await persistGame(state)
    return result
  }

const createStateBroadcastMiddleware =
  (broadcaster: (game: Game) => Promise<void>): Middleware<any, Game> =>
  ({ getState }) =>
  (next) =>
  async (action) => {
    const result = next(action)
    const state = getState()
    await broadcaster(state)
    return result
  }

type GameRoomDependencies = {
  initialGameState: Game
  password?: string
  persistGame: (game: Game) => Promise<void>
}
export class GameRoom {
  private readonly clients: Record<string, WebSocket>
  private readonly store: Store<Game, ClientAction | HostAction>
  private readonly password?: string

  constructor({
    initialGameState,
    password,
    persistGame
  }: GameRoomDependencies) {
    this.clients = {}
    this.password = password
    this.store = createStore(
      rootReducer,
      initialGameState,
      applyMiddleware(
        createPersistStateMiddleware(persistGame),
        createStateBroadcastMiddleware((updatedGame) =>
          this.broadcastMessage(hostActions.GAME_UPDATED({ game: updatedGame }))
        )
      )
    )
  }

  updateGame(action: ClientAction) {
    this.store.dispatch(action)
  }

  validatePassword(password?: string) {
    return this.password === undefined || this.password === password
  }

  get size() {
    return Object.keys(this.clients).length
  }

  async broadcastMessage<T extends Record<string, unknown>>(message: T) {
    await Promise.all(
      this.getClients().map(async (socket) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(message))
        }
      })
    )
  }

  async create({
    socket,
    ...payload
  }: { socket: WebSocket } & ClientAction<'CREATE_GAME'>['payload']) {
    this.clients[payload.playerId] = socket
    this.updateGame(clientActions.CREATE_GAME(payload))
  }

  async join({
    socket,
    ...payload
  }: { socket: WebSocket } & ClientAction<'JOIN_GAME'>['payload']) {
    const actionSender = createActionSender(socket)
    if (this.size >= this.store.getState().maxPlayers) {
      return await actionSender(
        hostActions.SHOW_NOTIFICATION({
          message: 'Game room is already full.',
          type: 'info'
        })
      )
    }

    this.clients[payload.playerId] = socket
    console.log(`Client ${payload.playerId} joined room ${payload.roomId}.`)
    this.updateGame(clientActions.JOIN_GAME(payload))
  }

  removeClient(clientId: string) {
    if (this.hasClient(clientId)) {
      delete this.clients[clientId]
      this.updateGame(clientActions.LEAVE_GAME({ playerId: clientId }))
    }
  }

  hasClient(clientId: string): boolean {
    return Boolean(this.clients[clientId])
  }

  private getClients(): WebSocket[] {
    return Object.values(this.clients)
  }
}
