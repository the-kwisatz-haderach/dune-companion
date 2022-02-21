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
  private static readonly MAXIMUM_RETRIES = 10
  private static readonly DEFAULT_ERROR_MESSAGE =
    'Failed to connect. Server might be down.'
  private static readonly DEFAULT_CLOSE_CONNECTION_MESSAGE =
    'Server closed connection.'
  private static readonly ID_QUERY_PARAMETER = 'clientId'
  private readonly HOST_URL: string
  private readonly clientIdStore: IClientIdStore
  private readonly websocket: ReconnectingWebSocket
  private readonly eventHandlers: IClientEventHandlers

  constructor({
    hostUrl,
    clientIdStore,
    eventHandlers
  }: IDunePlayerClientDependencies) {
    this.HOST_URL = hostUrl
    this.clientIdStore = clientIdStore

    console.log(
      `Connecting to socket at ${this.HOST_URL}?${
        DunePlayerClient.ID_QUERY_PARAMETER
      }=${this.clientIdStore.get()}`
    )

    this.websocket = new ReconnectingWebSocket(
      `${this.HOST_URL}?${
        DunePlayerClient.ID_QUERY_PARAMETER
      }=${this.clientIdStore.get()}`,
      undefined,
      {
        startClosed: true,
        maxRetries: DunePlayerClient.MAXIMUM_RETRIES
      }
    )
    this.eventHandlers = eventHandlers
  }

  async connect() {
    if (!this.isConnected()) {
      this.websocket.reconnect()
    }
    this.websocket.onopen = () => {
      if (this.websocket.retryCount > 0) {
        return this.eventHandlers.CONNECTION_REOPENED()
      }
    }
    this.websocket.onerror = (event) =>
      this.eventHandlers.ERROR(
        event?.message || DunePlayerClient.DEFAULT_ERROR_MESSAGE
      )
    this.websocket.onclose = (event) =>
      this.eventHandlers.CONNECTION_CLOSED_BY_HOST(
        event?.reason || DunePlayerClient.DEFAULT_CLOSE_CONNECTION_MESSAGE
      )
    this.websocket.onmessage = (event) => {
      const action = DunePlayerClient.parseIncomingAction(event.data)
      if (action.type === 'CLIENT_CONNECTED') {
        this.clientIdStore.set(action.payload.clientId)
        return this.eventHandlers.CONNECTION_OPENED(action.payload.clientId)
      }
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
