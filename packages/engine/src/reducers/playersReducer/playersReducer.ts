import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions, ClientActionType } from '../../actions'
import { createPlayer } from '../../factories'
import { getActionProperties } from '../../factories/getActionProperties'
import { Game, PlayerAction } from '../../models'
import { initialGameState } from '../initialGameState'

const removeByType = (type: ClientActionType) => (actions: PlayerAction[]) =>
  actions.filter(action => action.type !== type)

export const playersReducer = createReducer(
  initialGameState.players,
  (builder: ActionReducerMapBuilder<Game['players']>) =>
    builder
      .addCase(clientActions.SELECT_FACTION, (state, action) => {
        const isAlreadySelected = Object.values(state).some(
          player => player.faction === action.payload.faction
        )
        if (isAlreadySelected) return state

        state[action.payload.playerId].faction = action.payload.faction

        if (action.payload.faction === null) {
          state[action.payload.playerId].actions.push(
            getActionProperties('SELECT_FACTION')
          )
          return
        }

        state[action.payload.playerId].actions = removeByType('SELECT_FACTION')(
          state[action.payload.playerId].actions
        )
      })
      .addCase(clientActions.SET_PLAYER_ORDER, (state, action) => {
        state[action.payload.playerId].actions = removeByType(
          'SET_PLAYER_ORDER'
        )(state[action.payload.playerId].actions)
      })
      .addCase(clientActions.SET_FIRST_PLAYER, (state, action) => {
        state[action.payload.playerId].actions = removeByType(
          'SET_FIRST_PLAYER'
        )(state[action.payload.playerId].actions)
      })
      .addCase(clientActions.UPDATE_PLAYER_NAME, (state, action) => {
        if (action.payload.name === '') return state
        state[action.payload.playerId].name = action.payload.name
        state[action.payload.playerId].actions = removeByType(
          'UPDATE_PLAYER_NAME'
        )(state[action.payload.playerId].actions)
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
        state[action.payload.playerId].actions = removeByType(action.type)(
          state[action.payload.playerId].actions
        )
        state[action.payload.playerId].actions.push(
          getActionProperties('SET_IS_NOT_READY')
        )
      })
      .addCase(clientActions.SET_IS_NOT_READY, (state, action) => {
        state[action.payload.playerId].actions = removeByType(action.type)(
          state[action.payload.playerId].actions
        )
        state[action.payload.playerId].actions.push(
          getActionProperties('SET_IS_READY')
        )
      })
      .addCase(clientActions.REQUEST_ALLIANCE, (state, action) => {
        action.payload.responders.forEach(playerId => {
          state[playerId].actions.push(
            getActionProperties('RESPOND_TO_ALLIANCE_REQUEST', {
              id: action.payload.id
            })
          )
        })
      })
      .addCase(clientActions.RESPOND_TO_ALLIANCE_REQUEST, (state, action) => {
        if (action.payload.response === 'accept') {
          state[action.payload.playerId].actions = removeByType(action.type)(
            state[action.payload.playerId].actions
          )
          return state
        }
        Object.keys(state).forEach(playerId => {
          state[playerId].actions = state[playerId].actions.filter(
            playerAction =>
              !(
                playerAction.type === 'RESPOND_TO_ALLIANCE_REQUEST' &&
                playerAction.id === action.payload.id
              )
          )
        })
      })
      .addCase(clientActions.SET_PLAYER_SPICE, (state, action) => {
        state[action.payload.playerId].spice = action.payload.spice
        state[action.payload.playerId].actions = removeByType(action.type)(
          state[action.payload.playerId].actions
        )
      })
      .addCase(clientActions.SET_PLAYER_TREACHERY_CARDS, (state, action) => {
        state[action.payload.playerId].treacheryCards = action.payload.cards
        state[action.payload.playerId].actions = removeByType(action.type)(
          state[action.payload.playerId].actions
        )
      })
)
