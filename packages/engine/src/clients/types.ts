import { HostAction } from '../actions'

export interface ClientIdStore {
  get: () => string
  set: (clientId: string) => void
  clear: () => void
}

export type ClientEventHandlers = {
  ERROR: (event: Event) => void
  CONNECTION_OPENED: (event: Event) => void
  CONNECTION_CLOSED_BY_HOST: (event: CloseEvent) => void
  CONNECTION_CLOSED_BY_CLIENT: () => void
  INCOMING_MESSAGE: (action: HostAction) => void
}

export interface WebSocketLike extends WebSocket {
  connect: (url: string) => Promise<void>
}

export interface ClientDependencies {
  hostUrl: string
  clientIdStore: ClientIdStore
  websocket: WebSocketLike
  eventHandlers: ClientEventHandlers
}
