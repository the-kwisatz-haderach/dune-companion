import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { pull } from '../../helpers'
import { initialGameState } from '../../constants'

export const awaitingActionReducer = createReducer(
  initialGameState.awaitingAction,
  (builder: ActionReducerMapBuilder<Game['awaitingAction']>) =>
    builder.addCase(clientActions.LEAVE_GAME, (state, action) =>
      pull(state, action.payload.playerId)
    )
)
