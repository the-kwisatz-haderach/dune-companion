import { phaseOrder } from '../dictionaries'
import { Game } from '../models'
import { getPhaseActionProperties } from './getPhaseActionProperties'

export const createNextPhaseState = (state: Game): Game => {
  const nextPhase = phaseOrder[phaseOrder.indexOf(state.currentPhase) + 1]
  return {
    ...state,
    currentPhase: nextPhase,
    players: Object.values(state.players).reduce(
      (players, player) => ({
        ...players,
        [player.id]: {
          ...player,
          actions: getPhaseActionProperties(nextPhase, player.isAdmin)
        }
      }),
      state.players
    )
  }
}
