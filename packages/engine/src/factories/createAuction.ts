import { Game, Auction } from '../models'

export function createAuction(game: Game): Auction {
  return {
    isDone: false,
    rounds: [],
    participants: []
  }
}
