import { Player } from '.'

export type Auction = {
  participants: Player[]
  isDone: boolean
  currentBidderIndex: number
  isRunning: boolean
  rounds: AuctionRound[]
}

export type AuctionRound = {
  skipped: Player['id'][]
  bids: AuctionBid[]
}

export type AuctionBid = {
  playerId: string
  amount: number
}
