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
    const server = createHttpServer(sessionStore)
    const wsServer = new WebSocket.Server({ server })

    const gameManager = new GameManager({
      idGenerator,
      dataStore
    })

    // server.on('upgrade', async (req, socket, head) => {
    //   if (!authenticator.authenticate(req)) {
    //     socket.destroy()
    //   }
    //   wsServer.handleUpgrade(req, socket as any, head, function done(ws) {
    //     wsServer.emit('connection', ws, req)
    //   })
    // })

    server.listen(config.HTTP_PORT, () => {
      logger.log(`HTTP server started at port: ${config.HTTP_PORT}.`)
    })

    wsServer.on('close', () => logger.warn('Websocket server closed.'))
    wsServer.on('error', error => logger.error(error.message))
    wsServer.on('connection', (ws, req) =>
      gameManager.handleConnection(ws, req.url)
    )
  } catch (error) {
    logger.error(`Error occured: ${error.message}`)
  }
}
