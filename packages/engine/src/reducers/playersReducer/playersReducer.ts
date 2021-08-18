import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions, ClientActionType } from '../../actions'
import { createPlayer } from '../../factories'
import { createReplacer, pull } from '../../helpers'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

const replaceReadyState = createReplacer<ClientActionType>(
  'SET_IS_READY',
  'SET_IS_NOT_READY'
)

export const playersReducer = createReducer(
  initialGameState.players,
  (builder: ActionReducerMapBuilder<Game['players']>) =>
    builder
      .addCase(clientActions.SELECT_FACTION, (state, action) => {
        state[action.payload.playerId].faction = action.payload.faction
        if (action.payload.faction) {
          state[action.payload.playerId].actions.push('SET_IS_READY')
        } else {
          state[action.payload.playerId].actions = pull(
            state[action.payload.playerId].actions,
            'SET_IS_READY'
          )
        }
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
      .addMatcher(
        action =>
          action.type === 'SET_IS_READY' || action.type === 'SET_IS_NOT_READY',
        (state, action) => {
          state[action.payload.playerId].actions = replaceReadyState(
            state[action.payload.playerId].actions
          )
        }
      )
)
