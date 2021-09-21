import { createAuction } from '.'
import { Game } from '..'

export function createNewAuctionState(state: Game): Game {
  const newAuction = createAuction(state)
  return {
    ...state,
    auctions: [...state.auctions, newAuction]
  }
}
