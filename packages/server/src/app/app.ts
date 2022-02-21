import { createHttpServer } from './createHttpServer'
import { GameManager } from './GameManager'
import WebSocket from 'ws'
import { IAppDependencies } from '../types'
import { config } from '../config'

export const app = ({
  idGenerator,
  dataStore,
  logger,
  sessionStore,
  authenticator
}: IAppDependencies): void => {
  try {
    const gameManager = new GameManager({
      idGenerator,
      dataStore
    })
    const wsServer = new WebSocket.Server({
      noServer: true
    })

    const interval = setInterval(function ping() {
      wsServer.clients.forEach(function each(ws) {
        if ((ws as any).isAlive === false) return ws.terminate()

        ;(ws as any).isAlive = false
        ws.ping()
      })
    }, 30000)

    wsServer
      .on('close', () => {
        logger.warn('Websocket server closed.')
        clearInterval(interval)
      })
      .on('error', (error) => logger.error(error.message))
      .on('connection', (ws, req) => {
        gameManager.handleConnection(ws, req.url)

        ;(ws as any).isAlive = true
        ws.on('pong', function heartbeat() {
          ;(this as any).isAlive = true
        })
      })

    createHttpServer(sessionStore)
      .on('upgrade', async (req, socket, head) => {
        if (await !authenticator.authenticate(req)) {
          return socket.destroy()
        }
        wsServer.handleUpgrade(req, socket as any, head, function done(ws) {
          wsServer.emit('connection', ws, req)
        })
      })
      .listen(config.HTTP_PORT, () => {
        logger.log(`HTTP server started at port: ${config.HTTP_PORT}.`)
      })
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occured: ${error.message}`)
    }
  }
}
