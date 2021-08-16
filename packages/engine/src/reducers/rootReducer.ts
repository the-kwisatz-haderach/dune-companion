import { combineReducers } from '@reduxjs/toolkit'
import { Game } from '../models'
import { conditionsReducer } from './conditionsReducer'
import { currentPhaseReducer } from './currentPhaseReducer'
import { currentTurnReducer } from './currentTurnReducer'
import { currentFirstPlayerReducer } from './currentFirstPlayerReducer'
import { awaitingActionReducer } from './awaitingActionReducer'
import { playerOrderReducer } from './playerOrderReducer'
import { availableActionsReducer } from './availableActionsReducer'
import { playersReducer } from './playersReducer'
import { auctionsReducer } from './auctionsReducer'
import { allianceRequestsReducer } from './allianceRequestsReducer'
import { alliancesReducer } from './alliancesReducer'
import { notificationsReducer } from './notificationsReducer'

export const rootReducer = combineReducers<Game>({
  conditions: conditionsReducer,
  currentPhase: currentPhaseReducer,
  currentTurn: currentTurnReducer,
  currentFirstPlayer: currentFirstPlayerReducer,
  awaitingAction: awaitingActionReducer,
  playerOrder: playerOrderReducer,
  availableActions: availableActionsReducer,
  players: playersReducer,
  auctions: auctionsReducer,
  notifications: notificationsReducer,
  allianceRequests: allianceRequestsReducer,
  alliances: alliancesReducer
})
