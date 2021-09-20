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
      .addCase(clientActions.RESPOND_TO_ALLIANCE_REQUEST, (state, action) => {
        const allianceRequest = state.find(
          request => request.id === action.payload.id
        )
        if (!allianceRequest) return
        if (action.payload.response === 'decline') {
          state = state.filter(request => request.id !== action.payload.id)
        } else {
          allianceRequest.responders = allianceRequest.responders.filter(
            responder => responder !== action.payload.playerId
          )
          if (allianceRequest.responders.length === 0) {
            state = state.filter(request => request.id !== action.payload.id)
          }
        }
      })
      .addCase(clientActions.LEAVE_GAME, (state, action) =>
        state.filter(
          request =>
            request.requester !== action.payload.playerId &&
            !request.responders.includes(action.payload.playerId)
        )
      )
)
