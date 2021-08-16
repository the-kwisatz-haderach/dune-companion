import { combineReducers } from '@reduxjs/toolkit'
import { Game } from '../models'
import { conditionsReducer } from './conditionsReducer/conditionsReducer'
import { currentPhaseReducer } from './currentPhaseReducer/currentPhaseReducer'
import { currentTurnReducer } from './currentTurnReducer/currentTurnReducer'
import { currentFirstPlayerReducer } from './currentFirstPlayerReducer/currentFirstPlayerReducer'
import { awaitingActionReducer } from './awaitingActionReducer/awaitingActionReducer'
import { playerOrderReducer } from './playerOrderReducer/playerOrderReducer'
import { availableActionsReducer } from './availableActionsReducer/availableActionsReducer'
import { playersReducer } from './playersReducer/playersReducer'
import { auctionsReducer } from './auctionsReducer/auctionsReducer'
import { allianceRequestsReducer } from './allianceRequestsReducer/allianceRequestsReducer'
import { alliancesReducer } from './alliancesReducer/alliancesReducer'
import { notificationsReducer } from './notificationsReducer/notificationsReducer'

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
