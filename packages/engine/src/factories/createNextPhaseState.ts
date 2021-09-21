import { phaseOrder } from '../dictionaries'
import { Game } from '../models'
import { createNewPhasePlayerState } from './createNewPhasePlayerState'

export const createNextPhaseState = (state: Game): Game => {
  const nextPhase = phaseOrder[phaseOrder.indexOf(state.currentPhase) + 1]
  return {
    ...state,
    currentPhase: nextPhase,
    players: createNewPhasePlayerState(state.players)
  }
}
