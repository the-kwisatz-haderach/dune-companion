import { createAction } from '@reduxjs/toolkit'
import type { Game } from '../models/game'

export const GAME_CREATED = 'GAME_CREATED'
export const GAME_JOINED = 'GAME_JOINED'
export const GAME_LEFT = 'GAME_LEFT'
export const UPDATE_GAME = 'UPDATE_GAME'
export const SHOW_ERROR = 'SHOW_ERROR'

export const gameCreated = createAction<{ roomId: string }>(GAME_CREATED)
export const gameJoined = createAction<{ roomId: string }>(GAME_JOINED)
export const gameLeft = createAction(GAME_LEFT)
export const showError = createAction<{ message: string }>(SHOW_ERROR)
export const updateGame = createAction<{ game: Game }>(
  UPDATE_GAME
)

export const hostActions = {
  GAME_CREATED: gameCreated,
  GAME_JOINED: gameJoined,
  GAME_LEFT: gameLeft,
  UPDATE_GAME: updateGame,
  SHOW_ERROR: showError,
} as const

export type HostActionType = keyof typeof hostActions