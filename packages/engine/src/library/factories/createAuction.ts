import { Auction } from '../../models'

export function createAuction(playerIds: string[]): Auction {
  return {
    awaitingConfirmation: playerIds,
    currentRound: 0,
    participants: [],
    rounds: [],
    results: [],
    isDone: false
  }
}
