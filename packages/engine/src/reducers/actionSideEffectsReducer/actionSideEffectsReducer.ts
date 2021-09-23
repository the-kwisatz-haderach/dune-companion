import {
  createFinishedGameState,
  createNextPhaseState,
  createNewTurnState,
  createNewAuctionState
} from '../../factories'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

/*

On first bid --> start timer
Bid/Skip -> next player. 
if all have passed or one player is left
- Stop timer
else
- Repeat

Next round:
  if rounds < participants
  - Repeat by creating a new round
  else
  - isDone is true

*/

export const actionSideEffectsReducer = (
  state: Game = initialGameState
): Game => {
  if (!playersReady(state)) return state
  switch (state.currentPhase) {
    case 'BIDDING':
      if (!state.auctions[state.currentTurn]?.isDone) {
        return createNewAuctionState(state)
      }
    case 'SETUP':
      return createNewTurnState(state)
    case 'MENTAT_PAUSE':
      return state.currentTurn === state.maxTurns
        ? createFinishedGameState(state)
        : createNewTurnState(state)
    default:
      return createNextPhaseState(state)
  }
}

function playersReady(state: Game) {
  const players = Object.values(state.players)
  return players.every(player => player.hasCompletedPhase) && players.length > 0
}
