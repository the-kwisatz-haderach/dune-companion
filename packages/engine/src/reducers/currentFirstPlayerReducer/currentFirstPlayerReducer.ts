import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const currentFirstPlayerReducer = createReducer(
  initialGameState.currentFirstPlayer,
  (builder: ActionReducerMapBuilder<Game['currentFirstPlayer']>) =>
    builder.addCase(
      clientActions.SET_FIRST_PLAYER,
      (_, action) => action.payload.firstPlayerIndex
    )
)
