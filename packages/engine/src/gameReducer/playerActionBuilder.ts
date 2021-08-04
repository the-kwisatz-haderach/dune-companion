import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { playerActions } from '../actions'
import { factions } from '../library/constants/factions'
import { createPlayer } from '../library/factories'
import { Game } from '../models/game'

const pull = <T>(items: T[], key: T): T[] => items.filter(item => item !== key)
const omit = <T extends Record<string, unknown>>(
  object: T,
  property: keyof T
) => {
  const cloned = { ...object }
  delete cloned[property]
  return cloned
}

export default function playerActionBuilder(
  builder: ActionReducerMapBuilder<Game>
) {
  return builder
    .addCase(playerActions.CREATE_GAME, (state, action) => {
      state.id = action.payload.gameId
    })
    .addCase(playerActions.SET_CONDITIONS, (state, action) => {
      state.conditions = omit(action.payload, 'playerId')
    })
    .addCase(playerActions.SELECT_FACTION, (state, action) => {
      state.players[action.payload.playerId].faction = action.payload.faction
    })
    .addCase(playerActions.SET_PLAYER_ORDER, (state, action) => {
      state.playerOrder = action.payload.playerOrder
    })
    .addCase(playerActions.JOIN_GAME, (state, action) => {
      state.players[action.payload.playerId] = createPlayer({
        id: action.payload.playerId,
        name: action.payload.name
      })
    })
    .addCase(playerActions.LEAVE_GAME, (state, action) => {
      delete state.players[action.payload.playerId]

      state.awaitingAction = pull(state.awaitingAction, action.payload.playerId)
      const allianceIndex = state.alliances.findIndex(alliance =>
        alliance.players.includes(action.payload.playerId)
      )
      const alliance = state.alliances[allianceIndex]
      if (alliance.players.length > 2) {
        alliance.players = pull(alliance.players, action.payload.playerId)
      } else {
        state.alliances.splice(allianceIndex, 1)
      }
      state.allianceRequests = state.allianceRequests.filter(
        request =>
          request.requester !== action.payload.playerId &&
          request.responder !== action.payload.playerId
      )
      state.playerOrder = pull(state.playerOrder, action.payload.playerId)
    })
    .addCase(playerActions.START_GAME, state => {
      state.currentTurn = 1
      Object.keys(state.players).forEach(playerId => {
        const player = state.players[playerId]
        const { startingSpice, startingItems } = factions[player.faction]
        player.treacheryCards = startingItems
        player.spice = startingSpice
      })
    })
    .addCase(playerActions.REQUEST_ALLIANCE, (state, action) => {
      state.allianceRequests.push(omit(action.payload, 'playerId'))
    })
}
