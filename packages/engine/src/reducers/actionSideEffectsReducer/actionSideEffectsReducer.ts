import { createFinishedGameState } from '../../factories/createFinishedGameState'
import { createInitialGameState } from '../../factories/createInitialGameState'
import { createNewTurnState } from '../../factories/createNewTurnState'
import { createNextPhaseState } from '../../factories/createNextPhaseState'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const actionSideEffectsReducer = (
  state: Game = initialGameState
): Game => {
  const players = Object.values(state.players)
  switch (true) {
    case players.some(player =>
      player.actions.some(action => action.isRequired)
    ) || players.length === 0:
      return state
    case state.currentPhase === 'MENTAT_PAUSE' &&
      state.currentTurn === state.conditions.maxTurns:
      return createFinishedGameState(state)
    case state.currentPhase === 'MENTAT_PAUSE':
      return createNewTurnState(state)
    case state.currentPhase === 'SETUP':
      return createInitialGameState(state)
    default:
      return createNextPhaseState(state)
  }
}
