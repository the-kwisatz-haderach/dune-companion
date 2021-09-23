import { phaseOrder } from '../dictionaries'
import { Game } from '../models'
import { createNewPhasePlayerState } from './createNewPhasePlayerState'

export const createNextPhaseState = (state: Game): Game => ({
  ...state,
  currentPhase:
    state.currentPhase === 'NEXUS'
      ? 'CHOAM_CHARITY'
      : phaseOrder[phaseOrder.indexOf(state.currentPhase) + 1],
  players: createNewPhasePlayerState(state.players)
})
