export type Auction = {
  currentRound: number
  rounds: AuctionRound[]
  results: AuctionRoundResult[]
}

export type AuctionRound = {
  currentBidder: string
  bids: AuctionBid[]
}

export type AuctionRoundResult = {
  winner: string
  winningBid: number
}

export type AuctionBid = {
  playerId: string
  amount: number
}
