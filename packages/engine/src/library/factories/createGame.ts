import { Conditions, Game } from '../../models'
import { initialGameState } from '../constants'

export const createGame = (conditions: Conditions): Game => ({
  ...initialGameState,
  conditions
})
