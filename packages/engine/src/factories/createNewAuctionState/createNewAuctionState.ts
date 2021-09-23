import { createAuction, createNewPhasePlayerState } from '..'
import { Game } from '../..'

export function createNewAuctionState(state: Game): Game {
  const newAuction = createAuction(state)
  return {
    ...state,
    players: createNewPhasePlayerState(state.players),
    auctions: [...state.auctions, newAuction]
  }
}
