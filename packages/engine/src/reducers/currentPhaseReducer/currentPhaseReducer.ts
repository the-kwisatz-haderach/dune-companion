import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { initialGameState } from '../../constants'
import { Game } from '../../models'

export const currentPhaseReducer = createReducer(
  initialGameState.currentPhase,
  (builder: ActionReducerMapBuilder<Game['currentPhase']>) =>
    builder.addDefaultCase(state => state)
)
