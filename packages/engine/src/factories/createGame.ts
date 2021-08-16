import { initialGameState } from '../constants'
import { Conditions, Game } from '../models'

export const createGame = (conditions: Conditions): Game => ({
  ...initialGameState,
  conditions
})
