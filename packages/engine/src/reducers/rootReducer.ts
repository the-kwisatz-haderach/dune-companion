import {
  ActionReducerMapBuilder,
  combineReducers,
  compose,
  createReducer,
  Reducer
} from '@reduxjs/toolkit'
import { conditionsReducer } from './conditionsReducer/conditionsReducer'
import { awaitingActionReducer } from './awaitingActionReducer/awaitingActionReducer'
import { playerOrderReducer } from './playerOrderReducer/playerOrderReducer'
import { playersReducer } from './playersReducer/playersReducer'
import { auctionsReducer } from './auctionsReducer/auctionsReducer'
import { allianceRequestsReducer } from './allianceRequestsReducer/allianceRequestsReducer'
import { alliancesReducer } from './alliancesReducer/alliancesReducer'
import { actionSideEffectsReducer } from './actionSideEffectsReducer/actionSideEffectsReducer'
import { availableActionsReducer } from './availableActionsReducer'
import { ClientAction, HostAction } from '../actions'
import { Game } from '../models'
import { initialGameState } from './initialGameState'

const defaultBuilder = <T>(builder: ActionReducerMapBuilder<T>) =>
  builder.addDefaultCase(state => state)

const combinedReducer: Reducer<
  Game,
  ClientAction | HostAction
> = combineReducers({
  conditions: conditionsReducer,
  awaitingActions: awaitingActionReducer,
  playerOrder: playerOrderReducer,
  auctions: auctionsReducer,
  allianceRequests: allianceRequestsReducer,
  alliances: alliancesReducer,
  players: playersReducer,
  /*
    Below are states not affected by specific actions.
    Adding with defaultBuilder to include in composed reducer output below.
  */
  phaseStates: createReducer(initialGameState.phaseStates, defaultBuilder),
  isFinished: createReducer(initialGameState.isFinished, defaultBuilder),
  currentPhase: createReducer(initialGameState.currentPhase, defaultBuilder),
  currentTurn: createReducer(initialGameState.currentTurn, defaultBuilder),
  currentFirstPlayer: createReducer(
    initialGameState.currentFirstPlayer,
    defaultBuilder
  )
})

export const rootReducer: Reducer<Game, ClientAction | HostAction> = compose<
  Game
>(availableActionsReducer, actionSideEffectsReducer, combinedReducer)
