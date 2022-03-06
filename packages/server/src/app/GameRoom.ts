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

  updateGame(action: ClientAction): void {
    this.store.dispatch(action)
  }

  validatePassword(password?: string): boolean {
    return this.password === undefined || this.password === password
  }

  get size(): number {
    return Object.keys(this.clients).length
  }

  async broadcastMessage<T extends Record<string, unknown>>(
    message: T
  ): Promise<void> {
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
  }: {
    socket: WebSocket
  } & ClientAction<'CREATE_GAME'>['payload']): Promise<void> {
    this.clients[payload.playerId] = socket
    this.updateGame(clientActions.CREATE_GAME(payload))
  }

  async join({
    socket,
    ...payload
  }: {
    socket: WebSocket
  } & ClientAction<'JOIN_GAME'>['payload']): Promise<void> {
    if (payload.playerId in this.store.getState().players) {
      console.log(
        `Player ${payload.playerId} rejoining room ${payload.roomId}.`
      )
      this.clients[payload.playerId] = socket
      return this.updateGame(
        clientActions.SET_IDLE_STATUS({ ...payload, status: false })
      )
    }
    if (this.size >= this.store.getState().maxPlayers) {
      const actionSender = createActionSender(socket)
      return await actionSender(
        hostActions.SHOW_NOTIFICATION({
          message: 'Game room is already full.',
          type: 'info'
        })
      )
    }

    console.log(`Player ${payload.playerId} joined room ${payload.roomId}.`)
    this.clients[payload.playerId] = socket
    this.updateGame(clientActions.JOIN_GAME(payload))
  }

  async leave(payload: ClientAction<'LEAVE_GAME'>['payload']): Promise<void> {
    if (payload.playerId in this.clients) {
      console.log(`Player ${payload.playerId} left room ${payload.roomId}.`)
      delete this.clients[payload.playerId]
      this.updateGame(
        clientActions.SET_IDLE_STATUS({ ...payload, status: true })
      )
    }
  }

  hasClient(clientId: string): boolean {
    return Boolean(this.clients[clientId])
  }

  private getClients(): WebSocket[] {
    return Object.values(this.clients)
  }
}
