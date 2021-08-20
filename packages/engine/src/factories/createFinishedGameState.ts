import { Game } from '../models'

export const createFinishedGameState = (state: Game): Game => ({
  ...state,
  currentPhase: 'FINISHED'
})
