import {
  createFinishedGameState,
  createNextPhaseState,
  createNewTurnState,
  createNewAuctionState
} from '../../factories'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const actionSideEffectsReducer = (
  state: Game = initialGameState
): Game => {
  const players = Object.values(state.players)
  const isOngoing =
    players.some(player => player.actions.some(action => action.isRequired)) ||
    players.length === 0
  if (isOngoing) return state
  switch (state.currentPhase) {
    case 'BIDDING': {
      if (state.auctions.length < state.currentTurn) {
        return createNewAuctionState(state)
      }
    }
    case 'SETUP':
    case 'MENTAT_PAUSE': {
      if (state.currentTurn === state.conditions.maxTurns) {
        return createFinishedGameState(state)
      }
      return createNewTurnState(state)
    }
    default:
      return createNextPhaseState(state)
  }
}
