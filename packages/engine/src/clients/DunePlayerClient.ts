import { clientActions, ClientActionType, HostAction } from '../actions'
import {
  ClientDependencies,
  ClientEventHandlers,
  ClientIdStore,
  WebSocketLike
} from './types'

export default class DunePlayerClient {
  private static readonly idQueryParam = 'clientId'
  private readonly hostUrl: string
  private readonly clientIdStore: ClientIdStore
  private readonly websocket: WebSocketLike
  private readonly eventHandlers: ClientEventHandlers

  constructor({
    hostUrl,
    clientIdStore,
    websocket,
    eventHandlers
  }: ClientDependencies) {
    this.hostUrl = hostUrl
    this.clientIdStore = clientIdStore
    this.websocket = websocket
    this.eventHandlers = eventHandlers
  }

  private get clientId(): ClientIdStore {
    return this.clientIdStore
  }

  async connect() {
    if (!this.isConnected) {
      await this.websocket.connect(
        `${this.hostUrl}?${
          DunePlayerClient.idQueryParam
        }=${this.clientId.get()}`
      )
    }
    this.websocket.onopen = event => this.eventHandlers.CONNECTION_OPENED(event)
    this.websocket.onerror = event => this.eventHandlers.ERROR(event)
    this.websocket.onclose = event =>
      this.eventHandlers.CONNECTION_CLOSED_BY_HOST(event)
    this.websocket.onmessage = event => {
      const action = DunePlayerClient.parseIncomingAction(event.data)
      this.eventHandlers.INCOMING_MESSAGE(action)
    }
  }

  async disconnect() {
    await this.websocket.close()
    this.clientIdStore.clear()
    this.eventHandlers.CONNECTION_CLOSED_BY_CLIENT()
  }

  dispatchAction<
    T extends ClientActionType,
    P extends Omit<ReturnType<typeof clientActions[T]>['payload'], 'playerId'>
  >(type: T, payload: P) {
    const clientId = this.clientId.get()
    if (clientId !== '') {
      return this.websocket.send(
        JSON.stringify(
          clientActions[type]({
            ...payload,
            playerId: clientId
          } as any)
        )
      )
    }
  }

  get isConnected(): boolean {
    return this.websocket.readyState === WebSocket.OPEN
  }

  private static parseIncomingAction(data: any): HostAction {
    return JSON.parse(data)
  }
}
