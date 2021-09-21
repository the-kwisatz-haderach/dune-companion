import { createAuction } from '.'
import { Game } from '..'
import { getActionProperties } from './getActionProperties'

export function createNewAuctionState(state: Game): Game {
  const newAuction = createAuction(state)
  return {
    ...state,
    players: {
      ...state.players,
      ...newAuction.participants.reduce(
        (acc, playerId) => ({
          ...acc,
          [playerId]: {
            ...state.players[playerId],
            actions: [
              getActionProperties('PLACE_BID'),
              getActionProperties('SKIP_BID')
            ]
          }
        }),
        state.players
      )
    },
    auctions: [...state.auctions, newAuction]
  }
}
