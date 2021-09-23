import { initialGameState } from '..'
import { Auction, clientActions, createAuction } from '../..'
import { playerFixture } from '../../models/__fixtures__'
import { auctionsReducer } from './auctionsReducer'

describe('auctionsReducer', () => {
  const initialAuctionState: Auction = createAuction({
    ...initialGameState,
    playerOrder: ['somePlayer', 'anotherPlayer'],
    players: {
      somePlayer: {
        ...playerFixture,
        id: 'somePlayer',
        spice: 50,
        treacheryCards: 3
      },
      anotherPlayer: {
        ...playerFixture,
        id: 'anotherPlayer',
        spice: 500,
        treacheryCards: 2
      }
    }
  })

  describe('PLACE_BID', () => {
    it('adds the bid to the last auction round of the last auction', () => {
      expect(
        auctionsReducer(
          [initialAuctionState],
          clientActions.PLACE_BID({ playerId: 'somePlayer', bid: 300 })
        )
      ).toEqual([
        {
          ...initialAuctionState,
          rounds: [
            {
              bids: [{ playerId: 'somePlayer', amount: 300 }],
              currentBidderIndex: 1,
              skipped: []
            }
          ]
        }
      ])
    })
    test.todo('blocks bids higher than the players spice')
    test.todo('increments the currentBidderIndex to the next eligible player')
    test.todo(
      "automatically adds players to skipped who don't have enough spice to counter bid"
    )
    test.todo('blocks bids from non-participants')
  })
})
