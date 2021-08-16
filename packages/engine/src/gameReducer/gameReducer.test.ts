import { gameReducer } from '.'
import { clientActions } from '../actions'
import { initialGameState } from '../library'
import { factions } from '../library/constants/factions'
import { Factions } from '../models/faction'
import { playerFixture } from '../models/__fixtures__'

describe('gameReducer', () => {
  test('invalid action', () => {
    expect(gameReducer(initialGameState, {} as any)).toEqual(initialGameState)
  })
  test('createGame', () => {
    expect(
      gameReducer(
        initialGameState,
        clientActions.CREATE_GAME({
          playerId: 'test',
          roomId: 'someId',
          conditions: {
            maxPlayers: 4,
            maxTurns: 5,
            advancedMode: true
          }
        })
      )
    ).toEqual({
      ...initialGameState,
      conditions: {
        maxPlayers: 4,
        maxTurns: 5,
        advancedMode: true
      }
    })
  })
  test('requestAlliance', () => {
    expect(
      gameReducer(
        {
          ...initialGameState,
          allianceRequests: []
        },
        clientActions.REQUEST_ALLIANCE({
          playerId: 'test',
          requester: 'atreides',
          responder: 'fremen'
        })
      )
    ).toEqual({
      ...initialGameState,
      allianceRequests: [{ requester: 'atreides', responder: 'fremen' }]
    })
  })
  test('setPlayerOrder', () => {
    expect(
      gameReducer(
        {
          ...initialGameState,
          playerOrder: ['three', 'two', 'one']
        },
        clientActions.SET_PLAYER_ORDER({
          playerId: 'test',
          playerOrder: ['one', 'two', 'three']
        })
      )
    ).toEqual({
      ...initialGameState,
      playerOrder: ['one', 'two', 'three']
    })
  })
  describe('selectFaction', () => {
    it('selects a faction', () => {
      expect(
        gameReducer(
          {
            ...initialGameState,
            players: {
              test: {
                ...playerFixture,
                faction: Factions.BENE_GESSERIT
              }
            }
          },
          clientActions.SELECT_FACTION({
            playerId: 'test',
            faction: Factions.EMPEROR
          })
        )
      ).toEqual({
        ...initialGameState,
        players: {
          test: {
            ...playerFixture,
            faction: Factions.EMPEROR
          }
        }
      })
    })
    it('deselects a faction when null is provided', () => {
      expect(
        gameReducer(
          {
            ...initialGameState,
            players: {
              test: {
                ...playerFixture,
                faction: Factions.BENE_GESSERIT
              }
            }
          },
          clientActions.SELECT_FACTION({
            playerId: 'test',
            faction: null
          })
        )
      ).toEqual({
        ...initialGameState,
        players: {
          test: {
            ...playerFixture,
            faction: null
          }
        }
      })
    })
  })
  describe('joinGame', () => {
    it('adds a player to the game as an admin if no other players are in the game', () => {
      expect(
        gameReducer(
          initialGameState,
          clientActions.JOIN_GAME({
            playerId: 'test',
            roomId: 'someId'
          })
        )
      ).toEqual({
        ...initialGameState,
        players: {
          test: {
            id: 'test',
            isAdmin: true,
            isReady: false,
            name: '',
            faction: null,
            spice: 0,
            treacheryCards: 0
          }
        }
      })
    })
    it('adds a player to the game', () => {
      const initialState = {
        ...initialGameState,
        players: {
          somePlayer: {
            ...playerFixture,
            id: 'somePlayer'
          }
        }
      }
      expect(
        gameReducer(
          initialState,
          clientActions.JOIN_GAME({
            playerId: 'test',
            roomId: 'someId'
          })
        )
      ).toEqual({
        ...initialState,
        players: {
          ...initialState.players,
          test: {
            id: 'test',
            isAdmin: false,
            isReady: false,
            name: '',
            faction: null,
            spice: 0,
            treacheryCards: 0
          }
        }
      })
    })
    it('does nothing if the player is already in the game', () => {
      const initialState = {
        ...initialGameState,
        players: {
          somePlayer: {
            ...playerFixture,
            id: 'somePlayer'
          }
        }
      }
      expect(
        gameReducer(
          initialState,
          clientActions.JOIN_GAME({
            playerId: 'somePlayer',
            roomId: 'someId'
          })
        )
      ).toEqual({
        ...initialState,
        players: initialState.players
      })
    })
  })
  test('leaveGame', () => {
    expect(
      gameReducer(
        {
          ...initialGameState,
          awaitingAction: ['test'],
          players: {
            test: {
              id: 'test',
              isReady: false,
              isAdmin: false,
              name: 'paul',
              faction: null,
              spice: 0,
              treacheryCards: 0
            }
          },
          allianceRequests: [{ requester: 'test', responder: 'someone' }],
          alliances: [{ players: ['test', 'other', 'third'] }],
          playerOrder: ['test', 'other', 'third']
        },
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual({
      ...initialGameState,
      players: {},
      awaitingAction: [],
      allianceRequests: [],
      alliances: [{ players: ['other', 'third'] }],
      playerOrder: ['other', 'third']
    })
  })
  test('startGame', () => {
    expect(
      gameReducer(
        {
          ...initialGameState,
          players: {
            harkonnen: {
              ...playerFixture,
              faction: Factions.HOUSE_HARKONNEN,
              spice: 0,
              treacheryCards: 0
            },
            atreides: {
              ...playerFixture,
              faction: Factions.HOUSE_ATREIDES,
              spice: 0,
              treacheryCards: 0
            }
          }
        },
        clientActions.START_GAME({ playerId: 'somePlayer' })
      )
    ).toEqual({
      ...initialGameState,
      currentTurn: 1,
      players: {
        harkonnen: {
          ...playerFixture,
          faction: Factions.HOUSE_HARKONNEN,
          spice: factions[Factions.HOUSE_HARKONNEN].startingSpice,
          treacheryCards: factions[Factions.HOUSE_HARKONNEN].startingItems
        },
        atreides: {
          ...playerFixture,
          faction: Factions.HOUSE_ATREIDES,
          spice: factions[Factions.HOUSE_ATREIDES].startingSpice,
          treacheryCards: factions[Factions.HOUSE_ATREIDES].startingItems
        }
      }
    })
  })
  test('toggleReadyStatus', () => {
    expect(
      gameReducer(
        {
          ...initialGameState,
          players: {
            harkonnen: {
              ...playerFixture,
              isReady: true
            }
          }
        },
        clientActions.TOGGLE_READY_STATUS({ playerId: 'harkonnen' })
      )
    ).toEqual({
      ...initialGameState,
      players: {
        harkonnen: {
          ...playerFixture,
          isReady: false
        }
      }
    })
  })
})
