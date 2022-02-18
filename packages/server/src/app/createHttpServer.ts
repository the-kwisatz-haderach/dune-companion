import http from 'http'
import express from 'express'
import session, { Store } from 'express-session'
import { config } from '../config'

export const createHttpServer = (sessionStore: Store) =>
  new http.Server(
    express()
      .use(express.static('public'))
      .use(
        session({
          store: sessionStore,
          secret: config.SESSION_SECRET,
          saveUninitialized: true,
          resave: true
        })
      )
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
  )
