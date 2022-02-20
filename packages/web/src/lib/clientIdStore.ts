import { IClientIdStore } from '../dune-react'

const STORAGE_KEY = 'dune-client-id'

export const clientIdStore: IClientIdStore = {
  get: () => window.localStorage.getItem(STORAGE_KEY) ?? '',
  set: (clientId: string) => window.localStorage.setItem(STORAGE_KEY, clientId),
  clear: () => window.localStorage.removeItem(STORAGE_KEY)
}
