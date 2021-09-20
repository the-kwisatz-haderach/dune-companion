import { Player } from '.'

export type Auction = {
  participants: Player['id'][]
  isDone: boolean
  rounds: AuctionRound[]
}

export type AuctionRound = {
  currentBidderIndex: number
  skipped: Player['id'][]
  bids: AuctionBid[]
}

export type AuctionBid = {
  playerId: string
  amount: number
}
