import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const conditionsReducer = createReducer(
  initialGameState.conditions,
  (builder: ActionReducerMapBuilder<Game['conditions']>) =>
    builder.addCase(
      clientActions.CREATE_GAME,
      (_, action) => action.payload.conditions
    )
)
