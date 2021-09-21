import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const isRunningTimerReducer = createReducer(
  initialGameState.isRunningTimer,
  (builder: ActionReducerMapBuilder<Game['isRunningTimer']>) =>
    builder.addCase(clientActions.CREATE_GAME, state => state)
)
