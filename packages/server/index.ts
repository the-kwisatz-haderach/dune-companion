import redis from 'redis'
import { config } from './config'
import { createWebsocketServer } from './socket'
import { createHttpServer } from './app'
import { nanoid } from 'nanoid'
import { GameManager } from './GameManager'

const startServer = () => {
  try {
    const publisher = redis.createClient(config.REDIS_SERVER)
    const subscriber = redis.createClient(config.REDIS_SERVER)
    const httpServer = createHttpServer(subscriber)
    const wsServer = createWebsocketServer(httpServer)

    const gameManager = new GameManager({
      subscriber,
      publisher,
      idGenerator: nanoid
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
