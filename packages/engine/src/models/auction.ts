export type Auction = {
  awaitingConfirmation: string[]
  currentRound: number
  participants: string[]
  rounds: AuctionRound[]
  results: AuctionRoundResult[]
  isDone: boolean
}

export type AuctionRound = {
  currentBidder: string
  bids: AuctionBid[]
  passingOnBidding: string[]
}

export type AuctionRoundResult = {
  winner: string
  winningBid: number
}

export type AuctionBid = {
  bidder: string
  amount: number
}
