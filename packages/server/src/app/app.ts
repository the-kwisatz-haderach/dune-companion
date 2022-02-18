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
}: IAppDependencies) => {
  try {
    const gameManager = new GameManager({
      idGenerator,
      dataStore
    })
    const wsServer = new WebSocket.Server({
      noServer: true
      // host: config.WEBSOCKET_HOST
    })
      .on('close', () => logger.warn('Websocket server closed.'))
      .on('error', (error) => logger.error(error.message))
      .on('connection', (ws, req) => gameManager.handleConnection(ws, req.url))

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
