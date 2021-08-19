import { HostAction } from '@dune-companion/engine'
import { Event, ErrorEvent, CloseEvent } from 'reconnecting-websocket'

export type IClientEventHandlers = {
  ERROR: (event: ErrorEvent) => void
  CONNECTION_OPENED: (event: Event) => void
  CONNECTION_CLOSED_BY_HOST: (event: CloseEvent) => void
  CONNECTION_CLOSED_BY_CLIENT: () => void
  INCOMING_MESSAGE: (action: HostAction) => void
}

export interface IClientIdStore {
  get: () => string
  set: (clientId: string) => void
  clear: () => void
}

export interface IDunePlayerClientDependencies {
  hostUrl: string
  clientIdStore: IClientIdStore
  eventHandlers: IClientEventHandlers
}
