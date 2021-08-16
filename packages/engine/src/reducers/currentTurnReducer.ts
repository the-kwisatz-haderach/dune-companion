import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../actions'
import { initialGameState } from '../constants'
import { Game } from '../models'

export const currentTurnReducer = createReducer(
  initialGameState.currentTurn,
  (builder: ActionReducerMapBuilder<Game['currentTurn']>) =>
    builder.addCase(clientActions.START_GAME, () => 1)
)
