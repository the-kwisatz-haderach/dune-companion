import { promisify } from 'util'
import redis from 'redis'
import connectRedis from 'connect-redis'
import session from 'express-session'
import { nanoid as idGenerator } from '@reduxjs/toolkit'
import { Game } from '@dune-companion/engine'
import { app } from './app'
import { config } from './config'
import { IAuthenticator, IDataStore, ILogger } from './types'

const redisClient = redis.createClient(
  `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`
)

const get = promisify(redisClient.get).bind(redisClient)
const set = promisify(redisClient.set).bind(redisClient)

const dataStore: IDataStore<Game> = {
  get: async key => {
    const data = await get(key)
    if (!data) return data
    return JSON.parse(data)
  },
  persist: async (key, data) => set(key, JSON.stringify(data)) as Promise<void>,
  remove: async key => {
    redisClient.del(key)
  }
}

const RedisStore = connectRedis(session)
const sessionStore = new RedisStore({ client: redisClient })

const logger: ILogger = {
  log: console.log.bind(console),
  error: console.error.bind(console),
  warn: console.warn.bind(console)
}

const authenticator: IAuthenticator = {
  authenticate: async () => {
    console.log('authenticating...')
    return true
  },
  isAuthenticated: async () => true
}

app({ idGenerator, dataStore, logger, sessionStore, authenticator })
