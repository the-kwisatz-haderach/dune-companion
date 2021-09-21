import { Conditions, Game } from '../models'
import { initialGameState } from '../reducers/initialGameState'

export const createGame = (conditions: Conditions): Game => ({
  ...initialGameState,
  ...conditions
})
