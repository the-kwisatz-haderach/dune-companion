import { phaseOrder } from '../dictionaries'
import { Game } from '../models'
import { createRequiredPhaseActions } from './createRequiredPhaseActions'

export const createNextPhaseState = (state: Game): Game => {
  const nextPhase = phaseOrder[phaseOrder.indexOf(state.currentPhase) + 1]
  return {
    ...state,
    currentPhase: nextPhase,
    requiredActions: createRequiredPhaseActions(nextPhase)(
      Object.keys(state.players)
    )
  }
}
