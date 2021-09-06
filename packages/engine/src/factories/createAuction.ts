import { Auction } from '../models'

export function createAuction(): Auction {
  return {
    currentRound: 0,
    rounds: [],
    results: []
  }
}
