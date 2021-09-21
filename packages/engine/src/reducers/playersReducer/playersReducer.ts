import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { factions } from '../../dictionaries'
import { createPlayer } from '../../factories'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const playersReducer = createReducer(
  initialGameState.players,
  (builder: ActionReducerMapBuilder<Game['players']>) =>
    builder
      .addCase(clientActions.SELECT_FACTION, (state, action) => {
        const isAlreadySelected =
          action.payload.faction !== null &&
          Object.values(state).some(
            player => player.faction === action.payload.faction
          )
        if (isAlreadySelected) return state

        state[action.payload.playerId].faction = action.payload.faction

        if (action.payload.faction === null) {
          state[action.payload.playerId].spice = 0
          state[action.payload.playerId].treacheryCards = 0
          return
        }

        state[action.payload.playerId].spice =
          factions[action.payload.faction].startingSpice
        state[action.payload.playerId].treacheryCards =
          factions[action.payload.faction].startingItems
      })
      .addCase(clientActions.UPDATE_PLAYER_NAME, (state, action) => {
        if (
          action.payload.name === '' ||
          Object.values(state).some(
            player => player.name === action.payload.name
          )
        ) {
          return state
        }
        state[action.payload.playerId].name = action.payload.name
      })
      .addCase(clientActions.SET_ADMIN, (state, action) => {
        state[action.payload.playerId].isAdmin = false
        state[action.payload.id].isAdmin = true
      })
      .addCase(clientActions.CREATE_GAME, (state, action) => {
        state[action.payload.playerId] = createPlayer(action.payload.playerId, {
          isAdmin: true
        })
      })
      .addCase(clientActions.JOIN_GAME, (state, action) => {
        if (!state[action.payload.playerId]) {
          state[action.payload.playerId] = createPlayer(action.payload.playerId)
        }
      })
      .addCase(clientActions.LEAVE_GAME, (state, action) => {
        // Add additional cleanup of alliances etc...
        delete state[action.payload.playerId]
      })
      .addCase(clientActions.SET_IS_READY, (state, action) => {
        state[action.payload.playerId].hasCompletedPhase = true
      })
      .addCase(clientActions.SET_IS_NOT_READY, (state, action) => {
        state[action.payload.playerId].hasCompletedPhase = false
      })
      .addCase(clientActions.SET_PLAYER_SPICE, (state, action) => {
        state[action.payload.playerId].spice = action.payload.spice
      })
      .addCase(clientActions.SET_PLAYER_TREACHERY_CARDS, (state, action) => {
        state[action.payload.playerId].treacheryCards = action.payload.cards
      })
)
