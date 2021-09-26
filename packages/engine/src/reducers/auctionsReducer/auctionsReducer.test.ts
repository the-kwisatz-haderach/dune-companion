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
          clientActions.PLACE_BID({ playerId: 'somePlayer', bid: 50 })
        )
      ).toEqual([
        {
          ...initialAuctionState,
          isRunning: true,
          currentBidderIndex: 1,
          rounds: [
            {
              bids: [{ playerId: 'somePlayer', amount: 50 }],
              skipped: []
            }
          ]
        }
      ])
    })
    it('sets the currentBidderIndex to 0 again if the last participant placed a bid', () => {
      expect(
        auctionsReducer(
          [
            {
              ...initialAuctionState,
              currentBidderIndex: 1,
              rounds: [{ ...initialAuctionState.rounds[0] }]
            }
          ],
          clientActions.PLACE_BID({ playerId: 'anotherPlayer', bid: 300 })
        )
      ).toEqual([
        {
          ...initialAuctionState,
          isRunning: true,
          currentBidderIndex: 0,
          rounds: [
            {
              bids: [{ playerId: 'anotherPlayer', amount: 300 }],
              skipped: []
            }
          ]
        }
      ])
    })
    it('blocks bids higher than the players spice', () => {
      expect(
        auctionsReducer(
          [initialAuctionState],
          clientActions.PLACE_BID({ playerId: 'somePlayer', bid: 500 })
        )
      ).toEqual([initialAuctionState])
    })
  })

  describe('SKIP_BID', () => {
    it('adds the player id to skipped and updates the currentBidderIndex', () => {
      expect(
        auctionsReducer(
          [initialAuctionState],
          clientActions.SKIP_BID({ playerId: 'somePlayer' })
        )
      ).toEqual([
        {
          ...initialAuctionState,
          isRunning: false,
          currentBidderIndex: 1,
          rounds: [
            {
              bids: [],
              skipped: ['somePlayer']
            },
            {
              bids: [],
              skipped: []
            }
          ]
        }
      ])
    })
    it('stops the auction if all players have skipped and no bids have been made', () => {
      expect(
        auctionsReducer(
          [
            {
              ...initialAuctionState,
              isRunning: true,
              currentBidderIndex: 0,
              rounds: [
                {
                  bids: [],
                  skipped: ['anotherPlayer']
                }
              ]
            }
          ],
          clientActions.SKIP_BID({ playerId: 'somePlayer' })
        )
      ).toEqual([
        {
          ...initialAuctionState,
          isRunning: false,
          isDone: true,
          currentBidderIndex: 1,
          rounds: [
            {
              bids: [],
              skipped: ['anotherPlayer', 'somePlayer']
            }
          ]
        }
      ])
    })
    it('adds a new round to the auction if a round is completed, some bids have been made, and there are less rounds than participants', () => {
      expect(
        auctionsReducer(
          [
            {
              ...initialAuctionState,
              isRunning: false,
              isDone: false,
              currentBidderIndex: 0,
              rounds: [
                {
                  bids: [{ amount: 2, playerId: 'anotherPlayer' }],
                  skipped: []
                }
              ]
            }
          ],
          clientActions.SKIP_BID({ playerId: 'somePlayer' })
        )
      ).toEqual([
        {
          ...initialAuctionState,
          isRunning: false,
          isDone: false,
          currentBidderIndex: 1,
          rounds: [
            {
              bids: [{ amount: 2, playerId: 'anotherPlayer' }],
              skipped: ['somePlayer']
            },
            {
              bids: [],
              skipped: []
            }
          ]
        }
      ])
    })
  })
})
