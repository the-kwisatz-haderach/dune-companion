import { createAction } from '@reduxjs/toolkit'
import { EngineActionType } from '../models/actions'
import type { Game } from '../models/game'

export const incrementTurn = createAction(EngineActionType.INCREMENT_TURN)

export const incrementPhase = createAction(EngineActionType.INCREMENT_PHASE)

export const updateGame = createAction<{ game: Game }>(
  EngineActionType.UPDATE_GAME
)

export const engineActions = {
  [EngineActionType.INCREMENT_PHASE]: incrementPhase,
  [EngineActionType.INCREMENT_TURN]: incrementTurn,
  [EngineActionType.UPDATE_GAME]: updateGame
}
