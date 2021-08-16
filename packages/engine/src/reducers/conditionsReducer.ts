import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../actions'
import { initialGameState } from '../constants'
import { Game } from '../models'

export const conditionsReducer = createReducer(
  initialGameState.conditions,
  (builder: ActionReducerMapBuilder<Game['conditions']>) =>
    builder.addCase(
      clientActions.CREATE_GAME,
      (_, action) => action.payload.conditions
    )
)
