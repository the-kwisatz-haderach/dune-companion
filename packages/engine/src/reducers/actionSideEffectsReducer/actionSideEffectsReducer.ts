import { createFinishedGameState } from '../../factories/createFinishedGameState'
import { createNewTurnState } from '../../factories/createNewTurnState'
import { createNextPhaseState } from '../../factories/createNextPhaseState'
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
  if (state.currentPhase === 'MENTAT_PAUSE' || state.currentPhase === 'SETUP') {
    if (state.currentTurn === state.conditions.maxTurns)
      return createFinishedGameState(state)
    return createNewTurnState(state)
  }
  return createNextPhaseState(state)
}
