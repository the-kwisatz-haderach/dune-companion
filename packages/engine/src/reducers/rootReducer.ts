import {
  ActionReducerMapBuilder,
  combineReducers,
  compose,
  createReducer,
  Reducer
} from '@reduxjs/toolkit'
import { conditionsReducer } from './conditionsReducer/conditionsReducer'
import { requiredActionsReducer } from './requiredActionsReducer/requiredActionsReducer'
import { playerOrderReducer } from './playerOrderReducer/playerOrderReducer'
import { playersReducer } from './playersReducer/playersReducer'
import { auctionsReducer } from './auctionsReducer/auctionsReducer'
import { allianceRequestsReducer } from './allianceRequestsReducer/allianceRequestsReducer'
import { alliancesReducer } from './alliancesReducer/alliancesReducer'
import { actionSideEffectsReducer } from './actionSideEffectsReducer/actionSideEffectsReducer'
import { ClientAction, HostAction } from '../actions'
import { Game } from '../models'
import { initialGameState } from './initialGameState'
import { phaseStatesReducer } from './phaseStatesReducer/phaseStatesReducer'

const defaultBuilder = <T>(builder: ActionReducerMapBuilder<T>) =>
  builder.addDefaultCase(state => state)

const combinedReducer: Reducer<
  Game,
  ClientAction | HostAction
> = combineReducers({
  conditions: conditionsReducer,
  requiredActions: requiredActionsReducer,
  playerOrder: playerOrderReducer,
  auctions: auctionsReducer,
  allianceRequests: allianceRequestsReducer,
  alliances: alliancesReducer,
  players: playersReducer,
  phaseStates: phaseStatesReducer,
  /*
    Below are states not affected by specific actions.
    Adding with defaultBuilder to include in composed reducer output below.
  */
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
>(actionSideEffectsReducer, combinedReducer)
