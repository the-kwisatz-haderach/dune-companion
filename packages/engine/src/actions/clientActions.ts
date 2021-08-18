import { createAction } from '@reduxjs/toolkit'
import  { Conditions, Phases, PhaseStates } from '../models'
import type { AllianceRequest, AllianceRequestResponse } from '../models/alliance'
import type { Factions } from '../models/faction'

export const JOIN_GAME = 'JOIN_GAME'
export const LEAVE_GAME = 'LEAVE_GAME'
export const SET_ADMIN = 'SET_ADMIN'
export const UPDATE_PLAYER_NAME = 'UPDATE_PLAYER_NAME'
export const CREATE_GAME = 'CREATE_GAME'
export const SET_PLAYER_ORDER = 'SET_PLAYER_ORDER'
export const SELECT_FACTION = 'SELECT_FACTION'
export const REQUEST_ALLIANCE = 'REQUEST_ALLIANCE'
export const RESPOND_TO_ALLIANCE_REQUEST = 'RESPOND_TO_ALLIANCE_REQUEST'
export const SET_IS_READY = 'SET_IS_READY'
export const SET_IS_NOT_READY = 'SET_IS_NOT_READY'
export const DECLARE_AS_WINNER = 'DECLARE_AS_WINNER'
export const CONFIRM_WINNER = 'CONFIRM_WINNER'
export const MARK_PHASE_STEP_COMPLETED = 'MARK_PHASE_STEP_COMPLETED'
export const MARK_PHASE_STEP_NOT_COMPLETED = 'MARK_PHASE_STEP_NOT_COMPLETED'

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
export const respondToAllianceRequest = createClientAction<AllianceRequestResponse, typeof RESPOND_TO_ALLIANCE_REQUEST>(
  RESPOND_TO_ALLIANCE_REQUEST
)
export const joinGame = createClientAction<{ roomId: string; password?: string }, typeof JOIN_GAME>(JOIN_GAME)
export const leaveGame = createClientAction<void, typeof LEAVE_GAME>(LEAVE_GAME)
export const setIsReady = createClientAction<void, typeof SET_IS_READY>(SET_IS_READY)
export const setIsNotReady = createClientAction<void, typeof SET_IS_NOT_READY>(SET_IS_NOT_READY)
export const declareAsWinner = createClientAction<void, typeof DECLARE_AS_WINNER>(DECLARE_AS_WINNER)
export const confirmWinner = createClientAction<void, typeof CONFIRM_WINNER>(CONFIRM_WINNER)

export const markPhaseStepCompleted = createClientAction<{
  step: {
    [K in Phases]: keyof PhaseStates[K]
  }[Phases]
}, typeof MARK_PHASE_STEP_COMPLETED>(MARK_PHASE_STEP_COMPLETED)

export const markPhaseStepNotCompleted = createClientAction<{
  step: {
    [K in Phases]: keyof PhaseStates[K]
  }[Phases]
}, typeof MARK_PHASE_STEP_NOT_COMPLETED>(MARK_PHASE_STEP_NOT_COMPLETED)


export const clientActions = {
  SET_PLAYER_ORDER: setPlayerOrder,
  SELECT_FACTION: selectFaction,
  CREATE_GAME: createGame,
  REQUEST_ALLIANCE: requestAlliance,
  RESPOND_TO_ALLIANCE_REQUEST: respondToAllianceRequest,
  JOIN_GAME: joinGame,
  LEAVE_GAME: leaveGame,
  UPDATE_PLAYER_NAME: updatePlayerName,
  SET_ADMIN: setAdmin,
  SET_IS_READY: setIsReady,
  SET_IS_NOT_READY: setIsNotReady,
  DECLARE_AS_WINNER: declareAsWinner,
  CONFIRM_WINNER: confirmWinner,
  MARK_PHASE_STEP_COMPLETED: markPhaseStepCompleted,
  MARK_PHASE_STEP_NOT_COMPLETED: markPhaseStepNotCompleted
} as const

export type ClientActionType = keyof typeof clientActions
export type ClientAction<T extends ClientActionType = ClientActionType> = ReturnType<typeof clientActions[T]>
