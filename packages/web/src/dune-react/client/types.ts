import { HostAction, HostActionType } from '@dune-companion/engine'

export type IClientEventHandlers = {
  ERROR: (message: string) => void
  CONNECTION_REOPENED: () => void
  CONNECTION_OPENED: (clientId: string) => void
  CONNECTION_CLOSED_BY_HOST: (reason: string) => void
  CONNECTION_CLOSED_BY_CLIENT: () => void
  INCOMING_MESSAGE: (
    action: {
      [K in Exclude<HostActionType, 'CLIENT_CONNECTED'>]: HostAction<K>
    }[Exclude<HostActionType, 'CLIENT_CONNECTED'>]
  ) => void
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
