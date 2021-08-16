import { createAction } from '@reduxjs/toolkit'
import { Notification } from '../models'
import type { Game } from '../models/game'

export const CLIENT_CONNECTED = 'CLIENT_CONNECTED'
export const GAME_CREATED = 'GAME_CREATED'
export const GAME_JOINED = 'GAME_JOINED'
export const GAME_LEFT = 'GAME_LEFT'
export const GAME_UPDATED = 'GAME_UPDATED'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'


export const clientConnected = createAction<{ clientId: string }, typeof CLIENT_CONNECTED>(CLIENT_CONNECTED)
export const gameCreated = createAction<{ roomId: string }, typeof GAME_CREATED>(GAME_CREATED)
export const gameJoined = createAction<{ roomId: string }, typeof GAME_JOINED>(GAME_JOINED)
export const gameLeft = createAction(GAME_LEFT)
export const showNotification = createAction<Notification, typeof SHOW_NOTIFICATION>(SHOW_NOTIFICATION)
export const gameUpdated = createAction<{ game: Game }, typeof GAME_UPDATED>(
  GAME_UPDATED
)

export const hostActions = {
  CLIENT_CONNECTED: clientConnected,
  GAME_CREATED: gameCreated,
  GAME_JOINED: gameJoined,
  GAME_LEFT: gameLeft,
  GAME_UPDATED: gameUpdated,
  SHOW_NOTIFICATION: showNotification,
} as const

export type HostActionType = keyof typeof hostActions
export type HostAction = ReturnType<typeof hostActions[HostActionType]>