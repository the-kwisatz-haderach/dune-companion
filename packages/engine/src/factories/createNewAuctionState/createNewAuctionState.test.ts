import { createAuction } from '..'
import { Game, initialGameState } from '../..'
import { playerFixture } from '../../models/__fixtures__'
import { createNewAuctionState } from './createNewAuctionState'

describe('createNewAuctionState', () => {
  it('sets up the game for a new auction', () => {
    expect(
      createNewAuctionState({
        ...initialGameState,
        auctions: [],
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
  it('appends the new auction if there are previous completed auctions', () => {
    const state: Game = {
      ...initialGameState,
      auctions: [createAuction(initialGameState)],
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
    }
    expect(createNewAuctionState(state)).toEqual({
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
      auctions: [...state.auctions, createAuction(initialGameState)]
    })
  })
})
