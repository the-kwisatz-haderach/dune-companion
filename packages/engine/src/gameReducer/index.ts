import { createReducer, combineReducers } from '@reduxjs/toolkit'
import { Game } from '../models'
import { initialGameState } from '../library/constants/initialGameState'
import { conditionsBuilder } from './actionReducerBuilders/conditionsBuilder'
import { currentPhaseBuilder } from './actionReducerBuilders/currentPhaseBuilder'
import { currentTurnBuilder } from './actionReducerBuilders/currentTurnBuilder'
import { currentFirstPlayerBuilder } from './actionReducerBuilders/currentFirstPlayerBuilder'
import { awaitingActionBuilder } from './actionReducerBuilders/awaitingActionBuilder'
import { playerOrderBuilder } from './actionReducerBuilders/playerOrderBuilder'
import { availableActionsBuilder } from './actionReducerBuilders/availableActionsBuilder'
import { playersBuilder } from './actionReducerBuilders/playersBuilder'
import { auctionsBuilder } from './actionReducerBuilders/auctionsBuilder'
import { allianceRequestsBuilder } from './actionReducerBuilders/allianceRequestsBuilder'
import { alliancesBuilder } from './actionReducerBuilders/alliancesBuilder'

export const gameReducer = combineReducers<Game>({
  conditions: createReducer(initialGameState.conditions, conditionsBuilder),
  currentPhase: createReducer(
    initialGameState.currentPhase,
    currentPhaseBuilder
  ),
  currentTurn: createReducer(initialGameState.currentTurn, currentTurnBuilder),
  currentFirstPlayer: createReducer(
    initialGameState.currentFirstPlayer,
    currentFirstPlayerBuilder
  ),
  awaitingAction: createReducer(
    initialGameState.awaitingAction,
    awaitingActionBuilder
  ),
  playerOrder: createReducer(initialGameState.playerOrder, playerOrderBuilder),
  availableActions: createReducer(
    initialGameState.availableActions,
    availableActionsBuilder
  ),
  players: createReducer(initialGameState.players, playersBuilder),
  phases: createReducer(initialGameState.phases, builder =>
    builder.addDefaultCase(state => state)
  ),
  auctions: createReducer(initialGameState.auctions, auctionsBuilder),
  notifications: createReducer(initialGameState.notifications, builder =>
    builder.addDefaultCase(state => state)
  ),
  allianceRequests: createReducer(
    initialGameState.allianceRequests,
    allianceRequestsBuilder
  ),
  alliances: createReducer(initialGameState.alliances, alliancesBuilder)
})
