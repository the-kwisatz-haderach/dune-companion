import http from 'http'
import express, { Application, Request, Response } from 'express'
import connectRedis, { Client } from 'connect-redis'
import session from 'express-session'

export const createHttpServer = (redisClient: Client) => {
  const app: Application = express()
  const RedisStore = connectRedis(session)

  const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  })

  app.use(sessionMiddleware)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get(
    '/',
    async (req: Request, res: Response): Promise<Response> => {
      return res.status(200).send({
        message: 'Hello World!'
      })
    }
  )

  const httpServer = new http.Server(app)

  return httpServer
}
