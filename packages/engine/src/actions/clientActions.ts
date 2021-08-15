import { createAction } from '@reduxjs/toolkit'
import type { AllianceRequest } from '../models/alliance'
import type { Factions } from '../models/faction'
import type { Conditions } from '../models/game'

const JOIN_GAME = 'JOIN_GAME'
const LEAVE_GAME = 'LEAVE_GAME'
const SET_ADMIN = 'SET_ADMIN'
const UPDATE_PLAYER_NAME = 'UPDATE_PLAYER_NAME'
const CREATE_GAME = 'CREATE_GAME'
const SET_PLAYER_ORDER = 'SET_PLAYER_ORDER'
const START_GAME = 'START_GAME'
const SELECT_FACTION = 'SELECT_FACTION'
const REQUEST_ALLIANCE = 'REQUEST_ALLIANCE'
const CONFIRM_ALLIANCE = 'CONFIRM_ALLIANCE'
const TOGGLE_READY_STATUS = 'TOGGLE_READY_STATUS'

const createClientAction = <P extends Record<string ,unknown> | void = void, T extends string = string>(
  type: T
) => {
  return createAction<P extends void ? { playerId: string } : { playerId: string } & P, T>(type)
}

export const createGame = createClientAction<{ conditions: Conditions, roomId: string, password?: string }>(
  CREATE_GAME
)
export const updatePlayerName = createClientAction<{ name: string }>(
  UPDATE_PLAYER_NAME
)
export const setPlayerOrder = createClientAction<{ playerOrder: string[] }>(
  SET_PLAYER_ORDER
)
export const selectFaction = createClientAction<{ faction: Factions }>(
  SELECT_FACTION
)
export const setAdmin = createClientAction<{ id: string }>(SET_ADMIN)
export const startGame = createClientAction(START_GAME)
export const requestAlliance = createClientAction<AllianceRequest>(
  REQUEST_ALLIANCE
)
export const confirmAlliance = createClientAction<AllianceRequest>(
  CONFIRM_ALLIANCE
)
export const joinGame = createClientAction<{ roomId: string; password?: string }>(JOIN_GAME)
export const leaveGame = createClientAction(LEAVE_GAME)
export const toggleReadyStatus = createClientAction(TOGGLE_READY_STATUS)

export const clientActions = {
  SET_PLAYER_ORDER: setPlayerOrder,
  SELECT_FACTION: selectFaction,
  CREATE_GAME: createGame,
  REQUEST_ALLIANCE: requestAlliance,
  START_GAME: startGame,
  CONFIRM_ALLIANCE: confirmAlliance,
  JOIN_GAME: joinGame,
  LEAVE_GAME: leaveGame,
  UPDATE_PLAYER_NAME: updatePlayerName,
  SET_ADMIN: setAdmin,
  TOGGLE_READY_STATUS: toggleReadyStatus
} as const

export type ClientActionType = keyof typeof clientActions
