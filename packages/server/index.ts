import redis from 'redis'
import { config } from './config'
import { createWebsocketServer } from './socket'
import { createHttpServer } from './app'
import { nanoid } from 'nanoid'
import { RoomManager } from './RoomManager'
import WebSocket from 'ws'

const startServer = () => {
  try {
    const publisher = redis.createClient(config.REDIS_SERVER)
    const subscriber = redis.createClient(config.REDIS_SERVER)
    const httpServer = createHttpServer(subscriber)
    const wsServer = createWebsocketServer(httpServer)

    const roomManager = new RoomManager(subscriber, publisher)

    // httpServer.on("upgrade", (req, socket, head) => {
    //   if (isNotAuthenticated) {
    //     socket.destroy();
    //   }
    // });

    httpServer.listen(config.API_PORT, () => {
      console.log(`HTTP server started at port: ${config.API_PORT}.`)
    })

    wsServer.on('connection', (socket, req) => {
      console.log(socket.readyState === WebSocket.OPEN)
      const roomId = req.url?.split('=')[1]
      if (!roomId) {
        console.log('Missing valid room id. Terminating connection.')
        socket.send('Missing valid room id. Terminating connection.')
        return socket.terminate()
      }

      const clientId = nanoid()
      console.log(`Client ${clientId} joined room ${roomId}.`)
      roomManager.join(roomId, clientId, socket)

      socket.on('close', () => {
        console.log(`Client ${clientId} removed from room ${roomId}.`)
        roomManager.leave(roomId, clientId)
      })
    })
  } catch (error) {
    console.error(`Error occured: ${error.message}`)
  }
}

startServer()
