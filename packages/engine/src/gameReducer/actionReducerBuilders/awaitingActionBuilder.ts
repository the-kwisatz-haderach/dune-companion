import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { pull } from '../helpers'

export const awaitingActionBuilder = (
  builder: ActionReducerMapBuilder<Game['awaitingAction']>
) =>
  builder.addCase(clientActions.LEAVE_GAME, (state, action) =>
    pull(state, action.payload.playerId)
  )
