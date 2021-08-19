import { IClientIdStore } from '../dune-react'

const STORAGE_KEY = 'dune-client-id'

export const clientIdStore: IClientIdStore = {
  get: () => window.sessionStorage.getItem(STORAGE_KEY) ?? '',
  set: (clientId: string) =>
    window.sessionStorage.setItem(STORAGE_KEY, clientId),
  clear: () => window.sessionStorage.removeItem(STORAGE_KEY)
}
