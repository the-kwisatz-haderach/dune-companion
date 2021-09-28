import { Game } from '@dune-companion/engine'
import { Store } from 'express-session'
import { IncomingMessage } from 'http'

export interface IIdGenerator {
  (): string
}

export interface IDataStore<T> {
  persist: (key: string, data: T) => Promise<void>
  get: (key: string) => Promise<T | null>
  remove: (key: string) => Promise<void>
}

export interface ILogger {
  log: (...data: any[]) => void
  error: (...data: any[]) => void
  warn: (...data: any[]) => void
}

export interface IAuthenticator {
  authenticate: (req: IncomingMessage) => Promise<boolean>
  isAuthenticated: () => Promise<boolean>
}

export interface IAppDependencies {
  idGenerator: IIdGenerator
  dataStore: IDataStore<Game>
  logger: ILogger
  sessionStore: Store
  authenticator: IAuthenticator
}
