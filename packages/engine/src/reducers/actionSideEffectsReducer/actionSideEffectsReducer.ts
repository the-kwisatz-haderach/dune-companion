import { createFinishedGameState } from '../../factories/createFinishedGameState'
import { createInitialGameState } from '../../factories/createInitialGameState'
import { createNewTurnState } from '../../factories/createNewTurnState'
import { createNextPhaseState } from '../../factories/createNextPhaseState'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

const isInProgress = (state: Game) => state.requiredActions.length !== 0
const isLastPhase = (state: Game) => state.currentPhase === 'MENTAT_PAUSE'
const isLastTurn = (state: Game) =>
  state.currentTurn === state.conditions.maxTurns
const isFirstTurn = (state: Game) => state.currentTurn === 0

export const actionSideEffectsReducer = (
  state: Game = initialGameState
): Game => {
  switch (true) {
    case isInProgress(state):
      return state
    case isLastPhase(state) && isLastTurn(state):
      return createFinishedGameState(state)
    case isLastPhase(state):
      return createNewTurnState(state)
    case isFirstTurn(state):
      return createInitialGameState(state)
    default:
      return createNextPhaseState(state)
  }
}
