import { promisify } from 'util'
import { nanoid } from '@reduxjs/toolkit'
import redis from 'redis'
import { config } from './config'
import { createWebsocketServer } from './socket'
import { createHttpServer } from './app'
import { GameManager } from './GameManager'

const startServer = () => {
  try {
    const redisClient = redis.createClient(config.REDIS_SERVER)
    const httpServer = createHttpServer(redisClient)
    const wsServer = createWebsocketServer(httpServer)

    const get = promisify(redisClient.get).bind(redisClient)
    const set = promisify(redisClient.set).bind(redisClient)

    const gameManager = new GameManager({
      idGenerator: nanoid,
      dataStore: {
        get: async key => {
          const data = await get(key)
          if (!data) return data
          return JSON.parse(data)
        },
        persist: async (key, data) =>
          set(key, JSON.stringify(data)) as Promise<void>,
        remove: async key => {
          redisClient.del(key)
        }
      }
    })

    // httpServer.on("upgrade", (req, socket, head) => {
    //   if (isNotAuthenticated) {
    //     socket.destroy();
    //   }
    // });

    httpServer.listen(config.API_PORT, () => {
      console.log(`HTTP server started at port: ${config.API_PORT}.`)
    })

    wsServer.on('connection', (ws, req) =>
      gameManager.handleConnection(ws, req.url)
    )
  } catch (error) {
    console.error(`Error occured: ${error.message}`)
  }
}

startServer()
