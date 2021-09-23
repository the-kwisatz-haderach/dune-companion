import { Factions, initialGameState } from '../..'
import { playerFixture } from '../../models/__fixtures__'
import { createAuction } from './createAuction'

describe('createAuction', () => {
  it('returns an auction based on the current game state', () => {
    expect(createAuction(initialGameState)).toEqual({
      isDone: false,
      isRunning: false,
      participants: [],
      rounds: [
        {
          currentBidderIndex: 0,
          bids: [],
          skipped: []
        }
      ]
    })
  })
  it('includes players with less than 4 cards as participants', () => {
    expect(
      createAuction({
        ...initialGameState,
        playerOrder: ['somePlayer', 'anotherPlayer', 'yoPlayer'],
        players: {
          somePlayer: {
            ...playerFixture,
            id: 'somePlayer',
            treacheryCards: 3
          },
          anotherPlayer: {
            ...playerFixture,
            id: 'anotherPlayer',
            treacheryCards: 4
          },
          yoPlayer: {
            ...playerFixture,
            id: 'yoPlayer',
            treacheryCards: 1
          }
        }
      })
    ).toEqual({
      isDone: false,
      isRunning: false,
      participants: [
        {
          ...playerFixture,
          id: 'somePlayer',
          treacheryCards: 3
        },
        {
          ...playerFixture,
          id: 'yoPlayer',
          treacheryCards: 1
        }
      ],
      rounds: [
        {
          currentBidderIndex: 0,
          bids: [],
          skipped: []
        }
      ]
    })
  })
  it('includes the Harkonnen player if they have less than 8 cards', () => {
    expect(
      createAuction({
        ...initialGameState,
        playerOrder: ['somePlayer', 'anotherPlayer', 'yoPlayer'],
        players: {
          somePlayer: {
            ...playerFixture,
            treacheryCards: 7,
            id: 'somePlayer',
            faction: Factions.HOUSE_HARKONNEN
          },
          anotherPlayer: {
            ...playerFixture,
            id: 'anotherPlayer',
            treacheryCards: 4
          },
          yoPlayer: {
            ...playerFixture,
            id: 'yoPlayer',
            treacheryCards: 1
          }
        }
      })
    ).toEqual({
      isDone: false,
      isRunning: false,
      participants: [
        {
          ...playerFixture,
          treacheryCards: 7,
          id: 'somePlayer',
          faction: Factions.HOUSE_HARKONNEN
        },
        {
          ...playerFixture,
          id: 'yoPlayer',
          treacheryCards: 1
        }
      ],
      rounds: [
        {
          currentBidderIndex: 0,
          bids: [],
          skipped: []
        }
      ]
    })
  })
  it('adds participants according to the playerOrder', () => {
    expect(
      createAuction({
        ...initialGameState,
        playerOrder: ['anotherPlayer', 'yoPlayer', 'somePlayer'],
        players: {
          somePlayer: {
            ...playerFixture,
            id: 'somePlayer',
            treacheryCards: 7,
            faction: Factions.HOUSE_HARKONNEN
          },
          anotherPlayer: {
            ...playerFixture,
            id: 'anotherPlayer',
            treacheryCards: 4
          },
          yoPlayer: {
            ...playerFixture,
            id: 'yoPlayer',
            treacheryCards: 1
          }
        }
      })
    ).toEqual({
      isDone: false,
      isRunning: false,
      participants: [
        {
          ...playerFixture,
          id: 'yoPlayer',
          treacheryCards: 1
        },
        {
          ...playerFixture,
          id: 'somePlayer',
          treacheryCards: 7,
          faction: Factions.HOUSE_HARKONNEN
        }
      ],
      rounds: [
        {
          currentBidderIndex: 0,
          bids: [],
          skipped: []
        }
      ]
    })
  })
})
