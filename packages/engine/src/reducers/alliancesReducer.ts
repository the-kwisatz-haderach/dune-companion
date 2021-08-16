import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../actions'
import { Game } from '../models'
import { pull } from '../helpers'
import { initialGameState } from '../constants'

export const alliancesReducer = createReducer(
  initialGameState.alliances,
  (builder: ActionReducerMapBuilder<Game['alliances']>) =>
    builder.addCase(clientActions.LEAVE_GAME, (state, action) => {
      const allianceIndex = state.findIndex(alliance =>
        alliance.players.includes(action.payload.playerId)
      )
      const alliance = state[allianceIndex]
      if (alliance && alliance.players.length > 2) {
        alliance.players = pull(alliance.players, action.payload.playerId)
      } else {
        state.splice(allianceIndex, 1)
      }
    })
)
