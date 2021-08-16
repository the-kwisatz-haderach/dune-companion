import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { pull } from '../helpers'

export const playerOrderBuilder = (
  builder: ActionReducerMapBuilder<Game['playerOrder']>
) =>
  builder
    .addCase(
      clientActions.LEAVE_GAME,
      (state, action) => (state = pull(state, action.payload.playerId))
    )
    .addCase(
      clientActions.SET_PLAYER_ORDER,
      (state, action) => action.payload.playerOrder
    )
