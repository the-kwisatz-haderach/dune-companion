import { AuctionRound } from '../../models'

export function createAuctionRound(initialBidderId: string): AuctionRound {
  return {
    currentBidder: initialBidderId,
    passingOnBidding: [],
    bids: []
  }
}
