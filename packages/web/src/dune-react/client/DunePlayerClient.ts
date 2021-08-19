import {
  clientActions,
  HostAction,
  ClientAction,
  ClientActionType
} from '@dune-companion/engine'
import ReconnectingWebSocket from 'reconnecting-websocket'
import {
  IClientEventHandlers,
  IClientIdStore,
  IDunePlayerClientDependencies
} from './types'

export class DunePlayerClient {
  private static readonly idQueryParam = 'clientId'
  private readonly hostUrl: string
  private readonly clientIdStore: IClientIdStore
  private readonly websocket: ReconnectingWebSocket
  private readonly eventHandlers: IClientEventHandlers

  constructor({
    hostUrl,
    clientIdStore,
    eventHandlers
  }: IDunePlayerClientDependencies) {
    this.hostUrl = hostUrl
    this.clientIdStore = clientIdStore
    this.websocket = new ReconnectingWebSocket(
      `${this.hostUrl}?${
        DunePlayerClient.idQueryParam
      }=${this.clientIdStore.get()}`,
      undefined,
      {
        startClosed: true
      }
    )
    this.eventHandlers = eventHandlers
  }

  async connect() {
    if (!this.isConnected()) {
      this.websocket.reconnect()
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
    this.websocket.close()
    this.clientIdStore.clear()
    this.eventHandlers.CONNECTION_CLOSED_BY_CLIENT()
  }

  async dispatchAction<T extends ClientActionType>(
    type: T,
    payload: Omit<ClientAction<T>['payload'], 'playerId'>
  ): Promise<void> {
    const playerId = this.clientIdStore.get()
    if (playerId !== '') {
      this.websocket.send(
        JSON.stringify(
          clientActions[type]({
            ...(payload as any),
            playerId
          })
        )
      )
    }
  }

  isConnected(): boolean {
    return this.websocket.readyState === WebSocket.OPEN
  }

  // TODO: Add some type checking for safety...
  private static parseIncomingAction(data: any): HostAction {
    return JSON.parse(data)
  }
}
