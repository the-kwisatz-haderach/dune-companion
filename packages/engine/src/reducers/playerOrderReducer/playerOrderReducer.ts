import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { pull } from '../../helpers'
import { initialGameState } from '../initialGameState'

export const playerOrderReducer = createReducer(
  initialGameState.playerOrder,
  (builder: ActionReducerMapBuilder<Game['playerOrder']>) =>
    builder
      .addCase(clientActions.LEAVE_GAME, (state, action) =>
        pull(state, action.payload.playerId)
      )
      .addCase(
        clientActions.SET_PLAYER_ORDER,
        (_, action) => action.payload.playerOrder
      )
)
