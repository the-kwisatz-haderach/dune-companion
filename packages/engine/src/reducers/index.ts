import { combineReducers, compose, Reducer } from '@reduxjs/toolkit'
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

const combinedReducer = combineReducers({
  conditions: conditionsReducer,
  awaitingAction: awaitingActionReducer,
  playerOrder: playerOrderReducer,
  auctions: auctionsReducer,
  allianceRequests: allianceRequestsReducer,
  alliances: alliancesReducer,
  players: playersReducer
})

export const rootReducer: Reducer<Game, ClientAction | HostAction> = compose<
  Game
>(availableActionsReducer, actionSideEffectsReducer, combinedReducer)
