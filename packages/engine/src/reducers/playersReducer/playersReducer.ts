import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { createPlayer } from '../../factories'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const playersReducer = createReducer(
  initialGameState.players,
  (builder: ActionReducerMapBuilder<Game['players']>) =>
    builder
      .addCase(clientActions.SELECT_FACTION, (state, action) => {
        state[action.payload.playerId].faction = action.payload.faction
      })
      .addCase(clientActions.UPDATE_PLAYER_NAME, (state, action) => {
        state[action.payload.playerId].name = action.payload.name
      })
      .addCase(clientActions.SET_ADMIN, (state, action) => {
        state[action.payload.playerId].isAdmin = false
        state[action.payload.id].isAdmin = true
      })
      .addCase(clientActions.JOIN_GAME, (state, action) => {
        if (!state[action.payload.playerId]) {
          state[action.payload.playerId] = createPlayer({
            id: action.payload.playerId,
            isAdmin: Object.keys(state).length === 0
          })
        }
      })
      .addCase(clientActions.LEAVE_GAME, (state, action) => {
        delete state[action.payload.playerId]
      })
)
