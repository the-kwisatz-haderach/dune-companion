import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { initialGameState } from '../constants'
import { Game } from '../models'

export const availableActionsReducer = createReducer(
  initialGameState.availableActions,
  (builder: ActionReducerMapBuilder<Game['availableActions']>) =>
    builder.addDefaultCase(state => state)
)
