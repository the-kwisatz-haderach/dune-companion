import { createAuction } from '..'
import { initialGameState } from '../..'
import { playerFixture } from '../../models/__fixtures__'
import { createNewAuctionState } from './createNewAuctionState'

describe('createNewAuctionState', () => {
  it('sets up the game for a new auction', () => {
    expect(
      createNewAuctionState({
        ...initialGameState,
        players: {
          somePlayer: {
            ...playerFixture,
            id: 'somePlayer',
            hasCompletedPhase: true
          },
          anotherPlayer: {
            ...playerFixture,
            id: 'anotherPlayer',
            hasCompletedPhase: true
          }
        }
      })
    ).toEqual({
      ...initialGameState,
      players: {
        somePlayer: {
          ...playerFixture,
          id: 'somePlayer',
          hasCompletedPhase: false
        },
        anotherPlayer: {
          ...playerFixture,
          id: 'anotherPlayer',
          hasCompletedPhase: false
        }
      },
      auctions: [createAuction(initialGameState)]
    })
  })
})
