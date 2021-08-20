import { phaseOrder, requiredPhaseActions } from '../dictionaries'
import { Game } from '../models'
import { createPlayerAction } from './createPlayerAction'

export const createNextPhaseState = (state: Game): Game => {
  const nextPhase = phaseOrder[phaseOrder.indexOf(state.currentPhase) + 1]
  return {
    ...state,
    currentPhase: nextPhase,
    players: Object.keys(state.players).reduce<Game['players']>(
      (players, playerId) => ({
        ...players,
        [playerId]: {
          ...players[playerId],
          actions: requiredPhaseActions[nextPhase].map(type =>
            createPlayerAction(type)
          )
        }
      }),
      state.players
    )
  }
}
