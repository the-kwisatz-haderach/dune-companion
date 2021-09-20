import { createAuction } from '.'
import { Game } from '..'

export function createNewAuctionState(state: Game): Game {
  return {
    ...state,
    auctions: [...state.auctions, createAuction(state)]
  }
}
