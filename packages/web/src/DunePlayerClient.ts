import {
  ClientAction,
  clientActions,
  ClientActionType,
  HostAction
} from '@dune-companion/engine'
import { ClientIdStore } from '@dune-companion/engine/lib/clients/types'
import ReconnectingWebSocket, {
  Event,
  ErrorEvent,
  CloseEvent
} from 'reconnecting-websocket'

type ClientEventHandlers = {
  ERROR: (event: ErrorEvent) => void
  CONNECTION_OPENED: (event: Event) => void
  CONNECTION_CLOSED_BY_HOST: (event: CloseEvent) => void
  CONNECTION_CLOSED_BY_CLIENT: () => void
  INCOMING_MESSAGE: (action: HostAction) => void
}

export class DunePlayerClient {
  private static readonly idQueryParam = 'clientId'
  private readonly hostUrl: string
  private readonly clientIdStore: ClientIdStore
  private readonly websocket: ReconnectingWebSocket
  private readonly eventHandlers: ClientEventHandlers

  constructor({
    hostUrl,
    clientIdStore,
    eventHandlers
  }: {
    hostUrl: string
    clientIdStore: ClientIdStore
    eventHandlers: ClientEventHandlers
  }) {
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

  dispatchAction<
    T extends ClientActionType,
    P extends Omit<ClientAction<T>['payload'], 'playerId'>
  >(type: T, payload: P) {
    const playerId = this.clientIdStore.get()
    if (playerId !== '') {
      this.websocket.send(
        JSON.stringify(
          clientActions[type]({
            ...payload,
            playerId
          } as any)
        )
      )
    }
  }

  isConnected(): boolean {
    return this.websocket.readyState === WebSocket.OPEN
  }

  private static parseIncomingAction(data: any): HostAction {
    return JSON.parse(data)
  }
}
