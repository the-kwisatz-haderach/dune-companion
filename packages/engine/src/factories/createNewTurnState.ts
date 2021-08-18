import { Game } from '../models'
import { initialGameState } from '../reducers/initialGameState'
import { createRequiredPhaseActions } from './createRequiredPhaseActions'

const createRequiredStormPhaseActions = createRequiredPhaseActions('STORM')

export const createNewTurnState = (state: Game): Game => ({
  ...state,
  phaseStates: initialGameState.phaseStates,
  currentTurn: state.currentTurn + 1,
  requiredActions: createRequiredStormPhaseActions(Object.keys(state.players)),
  currentPhase: 'STORM'
})
