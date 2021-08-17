import { createAction } from '@reduxjs/toolkit'
import { Conditions } from '../models'
import type { AllianceRequest } from '../models/alliance'
import type { Factions } from '../models/faction'

export const JOIN_GAME = 'JOIN_GAME'
export const LEAVE_GAME = 'LEAVE_GAME'
export const SET_ADMIN = 'SET_ADMIN'
export const UPDATE_PLAYER_NAME = 'UPDATE_PLAYER_NAME'
export const CREATE_GAME = 'CREATE_GAME'
export const SET_PLAYER_ORDER = 'SET_PLAYER_ORDER'
export const SELECT_FACTION = 'SELECT_FACTION'
export const REQUEST_ALLIANCE = 'REQUEST_ALLIANCE'
export const CONFIRM_ALLIANCE = 'CONFIRM_ALLIANCE'
export const SET_IS_READY = 'SET_IS_READY'
export const SET_IS_NOT_READY = 'SET_IS_NOT_READY'

const createClientAction = <P extends Record<string ,unknown> | void = void, T extends string = string>(
  type: T
) => {
  return createAction<P extends void ? { playerId: string } : { playerId: string } & P, T>(type)
}

export const createGame = createClientAction<{ conditions: Conditions, roomId: string, password?: string }, typeof CREATE_GAME>(
  CREATE_GAME
)
export const updatePlayerName = createClientAction<{ name: string }, typeof UPDATE_PLAYER_NAME>(
  UPDATE_PLAYER_NAME
)
export const setPlayerOrder = createClientAction<{ playerOrder: string[] }, typeof SET_PLAYER_ORDER>(
  SET_PLAYER_ORDER
)
export const selectFaction = createClientAction<{ faction: Factions | null }, typeof SELECT_FACTION>(
  SELECT_FACTION
)
export const setAdmin = createClientAction<{ id: string }, typeof SET_ADMIN>(SET_ADMIN)
export const requestAlliance = createClientAction<AllianceRequest, typeof REQUEST_ALLIANCE>(
  REQUEST_ALLIANCE
)
export const confirmAlliance = createClientAction<AllianceRequest, typeof CONFIRM_ALLIANCE>(
  CONFIRM_ALLIANCE
)
export const joinGame = createClientAction<{ roomId: string; password?: string }, typeof JOIN_GAME>(JOIN_GAME)
export const leaveGame = createClientAction<void, typeof LEAVE_GAME>(LEAVE_GAME)
export const setIsReady = createClientAction<void, typeof SET_IS_READY>(SET_IS_READY)
export const setIsNotReady = createClientAction<void, typeof SET_IS_NOT_READY>(SET_IS_NOT_READY)

export const clientActions = {
  SET_PLAYER_ORDER: setPlayerOrder,
  SELECT_FACTION: selectFaction,
  CREATE_GAME: createGame,
  REQUEST_ALLIANCE: requestAlliance,
  CONFIRM_ALLIANCE: confirmAlliance,
  JOIN_GAME: joinGame,
  LEAVE_GAME: leaveGame,
  UPDATE_PLAYER_NAME: updatePlayerName,
  SET_ADMIN: setAdmin,
  SET_IS_READY: setIsReady,
  SET_IS_NOT_READY: setIsNotReady,
} as const

export type ClientActionType = keyof typeof clientActions
export type ClientAction = ReturnType<typeof clientActions[ClientActionType]>
