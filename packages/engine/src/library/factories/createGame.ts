import { Game } from '../../models'
import { initialGameState } from '../constants/initialGameState'

export function createGame(id: string): Game {
  return {
    ...initialGameState,
    id
  }
}
