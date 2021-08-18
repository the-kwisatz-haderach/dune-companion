import { playersReducer } from './playersReducer'
import { clientActions } from '../../actions'
import { Factions } from '../../models/faction'
import { playerFixture } from '../../models/__fixtures__'
import { initialGameState } from '../initialGameState'
import { Game } from '../../models'

describe('playersReducer', () => {
  describe('selectFaction', () => {
    it('selects a faction', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              faction: Factions.BENE_GESSERIT
            }
          },
          clientActions.SELECT_FACTION({
            playerId: 'test',
            faction: Factions.EMPEROR
          })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          faction: Factions.EMPEROR,
          actions: ['SET_IS_READY']
        }
      })
    })
    it('deselects a faction when null is provided', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              faction: Factions.BENE_GESSERIT,
              actions: ['SET_IS_READY']
            }
          },
          clientActions.SELECT_FACTION({
            playerId: 'test',
            faction: null
          })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          faction: null,
          actions: []
        }
      })
    })
  })
  describe('joinGame', () => {
    it('adds a player to the game as an admin if no other players are in the game', () => {
      expect(
        playersReducer(
          initialGameState.players,
          clientActions.JOIN_GAME({
            playerId: 'test',
            roomId: 'someId'
          })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          id: 'test',
          isAdmin: true
        }
      })
    })
    it('adds a player to the game', () => {
      const initialState: Game['players'] = {
        somePlayer: {
          ...playerFixture,
          id: 'somePlayer'
        }
      }
      expect(
        playersReducer(
          initialState,
          clientActions.JOIN_GAME({
            playerId: 'test',
            roomId: 'someId'
          })
        )
      ).toEqual({
        ...initialState,
        test: {
          ...playerFixture,
          id: 'test'
        }
      })
    })
    it('does nothing if the player is already in the game', () => {
      const initialState: Game['players'] = {
        somePlayer: {
          ...playerFixture,
          id: 'somePlayer'
        }
      }
      expect(
        playersReducer(
          initialState,
          clientActions.JOIN_GAME({
            playerId: 'somePlayer',
            roomId: 'someId'
          })
        )
      ).toEqual(initialState)
    })
  })
  test('leaveGame', () => {
    expect(
      playersReducer(
        {
          test: {
            ...playerFixture,
            id: 'test',
            isAdmin: false,
            name: 'paul',
            faction: null,
            spice: 0,
            treacheryCards: 0
          }
        },
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual({})
  })
  test('updatePlayerName', () => {
    expect(
      playersReducer(
        {
          testPlayer: {
            ...playerFixture,
            name: 'some name'
          }
        },
        clientActions.UPDATE_PLAYER_NAME({
          playerId: 'testPlayer',
          name: 'another name'
        })
      )
    ).toEqual({
      testPlayer: {
        ...playerFixture,
        name: 'another name'
      }
    })
  })
  test('setAdmin', () => {
    expect(
      playersReducer(
        {
          somePlayer: {
            ...playerFixture,
            isAdmin: true
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false
          }
        },
        clientActions.SET_ADMIN({
          playerId: 'somePlayer',
          id: 'anotherPlayer'
        })
      )
    ).toEqual({
      somePlayer: {
        ...playerFixture,
        isAdmin: false
      },
      anotherPlayer: {
        ...playerFixture,
        isAdmin: true
      }
    })
  })
  test('SET_IS_READY', () => {
    expect(
      playersReducer(
        {
          somePlayer: {
            ...playerFixture,
            actions: ['SET_IS_READY']
          }
        },
        clientActions.SET_IS_READY({
          playerId: 'somePlayer'
        })
      )
    ).toEqual({
      somePlayer: {
        ...playerFixture,
        actions: ['SET_IS_NOT_READY']
      }
    })
  })
  test('SET_IS_NOT_READY', () => {
    expect(
      playersReducer(
        {
          somePlayer: {
            ...playerFixture,
            actions: ['SET_IS_NOT_READY']
          }
        },
        clientActions.SET_IS_NOT_READY({
          playerId: 'somePlayer'
        })
      )
    ).toEqual({
      somePlayer: {
        ...playerFixture,
        actions: ['SET_IS_READY']
      }
    })
  })
})
