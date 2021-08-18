import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { omit } from '../../helpers'
import { initialGameState } from '../initialGameState'

export const allianceRequestsReducer = createReducer(
  initialGameState.allianceRequests,
  (builder: ActionReducerMapBuilder<Game['allianceRequests']>) =>
    builder
      .addCase(clientActions.REQUEST_ALLIANCE, (state, action) => {
        state.push(omit(action.payload, 'playerId'))
      })
      .addCase(clientActions.LEAVE_GAME, (state, action) =>
        state.filter(
          request =>
            request.requester !== action.payload.playerId &&
            !request.responders.includes(action.payload.playerId)
        )
      )
)
