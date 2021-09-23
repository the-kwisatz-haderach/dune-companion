import {
  ActionReducerMapBuilder,
  combineReducers,
  compose,
  createReducer,
  Reducer
} from '@reduxjs/toolkit'
import {
  isAdvancedModeReducer,
  maxTurnsReducer,
  maxPlayersReducer
} from './conditionsReducer/conditionsReducer'
import { playerOrderReducer } from './playerOrderReducer/playerOrderReducer'
import { playersReducer } from './playersReducer/playersReducer'
import { allianceRequestsReducer } from './allianceRequestsReducer/allianceRequestsReducer'
import { alliancesReducer } from './alliancesReducer/alliancesReducer'
import { actionSideEffectsReducer } from './actionSideEffectsReducer/actionSideEffectsReducer'
import { ClientAction, HostAction } from '../actions'
import { Game } from '../models'
import { initialGameState } from './initialGameState'
import { phaseStatesReducer } from './phaseStatesReducer/phaseStatesReducer'
import { currentFirstPlayerReducer } from './currentFirstPlayerReducer/currentFirstPlayerReducer'
import { currentPhaseReducer } from './currentPhaseReducer'

const defaultBuilder = <T>(builder: ActionReducerMapBuilder<T>) =>
  builder.addDefaultCase(state => state)

const combinedReducer: Reducer<
  Game,
  ClientAction | HostAction
> = combineReducers({
  isAdvancedMode: isAdvancedModeReducer,
  maxPlayers: maxPlayersReducer,
  maxTurns: maxTurnsReducer,
  playerOrder: playerOrderReducer,
  allianceRequests: allianceRequestsReducer,
  alliances: alliancesReducer,
  players: playersReducer,
  phaseStates: phaseStatesReducer,
  currentFirstPlayer: currentFirstPlayerReducer,
  currentPhase: currentPhaseReducer,
  /*
  Below are states not affected by specific actions.
  Adding with defaultBuilder to include in composed reducer output below.
  */
  auctions: createReducer(initialGameState.auctions, defaultBuilder),
  isRunningTimer: createReducer(
    initialGameState.isRunningTimer,
    defaultBuilder
  ),
  currentTurn: createReducer(initialGameState.currentTurn, defaultBuilder)
})

export const rootReducer: Reducer<Game, ClientAction | HostAction> = compose<
  Game
>(actionSideEffectsReducer, combinedReducer)
