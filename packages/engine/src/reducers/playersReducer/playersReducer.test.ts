import { playersReducer } from './playersReducer'
import { clientActions } from '../../actions'
import { Factions } from '../../models/faction'
import { playerFixture } from '../../models/__fixtures__'
import { initialGameState } from '../initialGameState'
import { Game } from '../../models'
import { createPlayerAction } from '../../factories/createPlayerAction'
import { createPlayer } from '../../factories'

jest.mock('@reduxjs/toolkit', () => ({
  ...(jest.requireActual('@reduxjs/toolkit') as object),
  nanoid: () => 'mockNanoId'
}))

describe('playersReducer', () => {
  describe('CREATE_GAME', () => {
    it('adds the creator to the game as admin', () => {
      expect(
        playersReducer(
          initialGameState.players,
          clientActions.CREATE_GAME({
            playerId: 'test',
            roomId: 'someId',
            conditions: initialGameState.conditions
          })
        )
      ).toEqual({
        ...initialGameState.players,
        test: createPlayer('test', { isAdmin: true })
      })
    })
  })
  describe('SELECT_FACTION', () => {
    it('selects a faction', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              faction: Factions.BENE_GESSERIT,
              actions: [createPlayerAction('SELECT_FACTION')]
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
          actions: []
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
              actions: []
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
          actions: [createPlayerAction('SELECT_FACTION')]
        }
      })
    })
    it('returns the state if the faction is already selected', () => {
      const state: Game['players'] = {
        test: {
          ...playerFixture,
          faction: null
        },
        anotherTest: {
          ...playerFixture,
          faction: Factions.BENE_GESSERIT
        }
      }
      expect(
        playersReducer(
          state,
          clientActions.SELECT_FACTION({
            playerId: 'test',
            faction: Factions.BENE_GESSERIT
          })
        )
      ).toEqual(state)
    })
  })
  describe('JOIN_GAME', () => {
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
        test: createPlayer('test')
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
  describe('LEAVE_GAME', () => {
    it('removes the player', () => {
      expect(
        playersReducer(
          {
            test: createPlayer('test')
          },
          clientActions.LEAVE_GAME({ playerId: 'test' })
        )
      ).toEqual({})
    })
  })
  describe('UPDATE_PLAYER_NAME', () => {
    it('updates the players name', () => {
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
    it('does nothing if the name is empty', () => {
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
            name: ''
          })
        )
      ).toEqual({
        testPlayer: {
          ...playerFixture,
          name: 'some name'
        }
      })
    })
  })
  describe('SET_ADMIN', () => {
    it('updates the admin', () => {
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
  })
  describe('SET_IS_READY', () => {
    it('gives the player an option to undo', () => {
      expect(
        playersReducer(
          {
            somePlayer: {
              ...playerFixture,
              actions: [createPlayerAction('SET_IS_READY')]
            }
          },
          clientActions.SET_IS_READY({
            playerId: 'somePlayer'
          })
        )
      ).toEqual({
        somePlayer: {
          ...playerFixture,
          actions: [createPlayerAction('SET_IS_NOT_READY')]
        }
      })
    })
  })

  describe('SET_IS_NOT_READY', () => {
    it('requires the player to set ready state again', () => {
      expect(
        playersReducer(
          {
            somePlayer: {
              ...playerFixture,
              actions: [createPlayerAction('SET_IS_NOT_READY')]
            }
          },
          clientActions.SET_IS_NOT_READY({
            playerId: 'somePlayer'
          })
        )
      ).toEqual({
        somePlayer: {
          ...playerFixture,
          actions: [createPlayerAction('SET_IS_READY')]
        }
      })
    })
  })

  describe('REQUEST_ALLIANCE', () => {
    it('adds required actions to responders', () => {
      expect(
        playersReducer(
          {
            somePlayer: {
              ...playerFixture
            },
            anotherPlayer: {
              ...playerFixture
            },
            thirdPlayer: {
              ...playerFixture
            }
          },
          clientActions.REQUEST_ALLIANCE({
            playerId: 'somePlayer',
            responders: ['anotherPlayer', 'thirdPlayer']
          })
        )
      ).toEqual({
        somePlayer: {
          ...playerFixture
        },
        anotherPlayer: {
          ...playerFixture,
          actions: [
            createPlayerAction('RESPOND_TO_ALLIANCE_REQUEST', {
              id: 'mockNanoId'
            })
          ]
        },
        thirdPlayer: {
          ...playerFixture,
          actions: [
            createPlayerAction('RESPOND_TO_ALLIANCE_REQUEST', {
              id: 'mockNanoId'
            })
          ]
        }
      })
    })
  })

  describe('RESPOND_TO_ALLIANCE_REQUEST', () => {
    describe('when the response = confirm', () => {
      it('updates required actions', () => {
        expect(
          playersReducer(
            {
              somePlayer: {
                ...playerFixture
              },
              anotherPlayer: {
                ...playerFixture,
                actions: [
                  createPlayerAction('RESPOND_TO_ALLIANCE_REQUEST', {
                    id: 'someAlliance'
                  })
                ]
              },
              thirdPlayer: {
                ...playerFixture,
                actions: [
                  createPlayerAction('RESPOND_TO_ALLIANCE_REQUEST', {
                    id: 'someAlliance'
                  })
                ]
              }
            },
            clientActions.RESPOND_TO_ALLIANCE_REQUEST({
              id: 'someAlliance',
              playerId: 'anotherPlayer',
              response: 'accept'
            })
          )
        ).toEqual({
          somePlayer: {
            ...playerFixture
          },
          anotherPlayer: {
            ...playerFixture,
            actions: []
          },
          thirdPlayer: {
            ...playerFixture,
            actions: [
              createPlayerAction('RESPOND_TO_ALLIANCE_REQUEST', {
                id: 'someAlliance'
              })
            ]
          }
        })
      })
    })
    describe('when the response = decline', () => {
      it('updates required actions', () => {
        expect(
          playersReducer(
            {
              anotherPlayer: {
                ...playerFixture,
                actions: [
                  createPlayerAction('RESPOND_TO_ALLIANCE_REQUEST', {
                    id: 'someAlliance'
                  })
                ]
              },
              thirdPlayer: {
                ...playerFixture,
                actions: [
                  createPlayerAction('RESPOND_TO_ALLIANCE_REQUEST', {
                    id: 'someAlliance'
                  })
                ]
              }
            },
            clientActions.RESPOND_TO_ALLIANCE_REQUEST({
              playerId: 'anotherPlayer',
              response: 'decline',
              id: 'someAlliance'
            })
          )
        ).toEqual({
          anotherPlayer: {
            ...playerFixture,
            actions: []
          },
          thirdPlayer: {
            ...playerFixture,
            actions: []
          }
        })
      })
    })
  })

  describe('SET_PLAYER_SPICE', () => {
    it('updates the player', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              actions: [createPlayerAction('SET_PLAYER_SPICE')]
            }
          },
          clientActions.SET_PLAYER_SPICE({ playerId: 'test', spice: 666 })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          spice: 666,
          actions: []
        }
      })
    })
  })

  describe('SET_PLAYER_ORDER', () => {
    it('updates the player', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              actions: [createPlayerAction('SET_PLAYER_ORDER')]
            }
          },
          clientActions.SET_PLAYER_ORDER({
            playerId: 'test',
            playerOrder: ['test', 'hello']
          })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          actions: []
        }
      })
    })
  })

  describe('SET_FIRST_PLAYER', () => {
    it('updates the player', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              actions: [createPlayerAction('SET_FIRST_PLAYER')]
            }
          },
          clientActions.SET_FIRST_PLAYER({
            playerId: 'test',
            firstPlayerIndex: 1
          })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          actions: []
        }
      })
    })
  })

  describe('SET_PLAYER_TREACHERY_CARDS', () => {
    it('updates the player', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              actions: [createPlayerAction('SET_PLAYER_TREACHERY_CARDS')]
            }
          },
          clientActions.SET_PLAYER_TREACHERY_CARDS({
            playerId: 'test',
            cards: 3
          })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          treacheryCards: 3,
          actions: []
        }
      })
    })
  })
})
