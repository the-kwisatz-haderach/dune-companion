import { playersReducer } from './playersReducer'
import { clientActions } from '../../actions'
import { Factions } from '../../models/faction'
import { playerFixture } from '../../models/__fixtures__'
import { initialGameState } from '../initialGameState'
import { Game } from '../../models'
import { createPlayer } from '../../factories'
import { factions } from '../../dictionaries'

jest.mock('@reduxjs/toolkit', () => ({
  ...(jest.requireActual('@reduxjs/toolkit') as Record<string, unknown>),
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
            conditions: {
              maxTurns: initialGameState.maxTurns,
              isAdvancedMode: initialGameState.isAdvancedMode,
              maxPlayers: initialGameState.maxPlayers
            }
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
          spice: factions.EMPEROR.startingSpice,
          treacheryCards: factions.EMPEROR.startingItems
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
              spice: factions.BENE_GESSERIT.startingSpice,
              treacheryCards: factions.BENE_GESSERIT.startingItems
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
          spice: 0,
          treacheryCards: 0
        }
      })
    })
    it('always works for null', () => {
      expect(
        playersReducer(
          {
            test: {
              ...playerFixture,
              faction: Factions.BENE_GESSERIT,
              spice: factions.BENE_GESSERIT.startingSpice,
              treacheryCards: factions.BENE_GESSERIT.startingItems
            },
            otherTest: {
              ...playerFixture,
              faction: null,
              spice: 1,
              treacheryCards: 5
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
          spice: 0,
          treacheryCards: 0
        },
        otherTest: {
          ...playerFixture,
          faction: null,
          spice: 1,
          treacheryCards: 5
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
    it('does nothing if the name is the same as another players', () => {
      const state: Game['players'] = {
        testPlayer: {
          ...playerFixture,
          name: 'someone'
        },
        anotherPlayer: {
          ...playerFixture,
          name: 'some name'
        }
      }
      expect(
        playersReducer(
          state,
          clientActions.UPDATE_PLAYER_NAME({
            playerId: 'testPlayer',
            name: 'someone'
          })
        )
      ).toEqual(state)
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
    it('updates the player state', () => {
      expect(
        playersReducer(
          {
            somePlayer: {
              ...playerFixture,
              hasCompletedPhase: false
            }
          },
          clientActions.SET_IS_READY({
            playerId: 'somePlayer'
          })
        )
      ).toEqual({
        somePlayer: {
          ...playerFixture,
          hasCompletedPhase: true
        }
      })
    })
  })

  describe('SET_IS_NOT_READY', () => {
    it('updates the player state', () => {
      expect(
        playersReducer(
          {
            somePlayer: {
              ...playerFixture,
              hasCompletedPhase: true
            }
          },
          clientActions.SET_IS_NOT_READY({
            playerId: 'somePlayer'
          })
        )
      ).toEqual({
        somePlayer: {
          ...playerFixture,
          hasCompletedPhase: false
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
          ...playerFixture
        },
        thirdPlayer: {
          ...playerFixture
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
                ...playerFixture
              },
              thirdPlayer: {
                ...playerFixture
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
            ...playerFixture
          },
          thirdPlayer: {
            ...playerFixture
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
                ...playerFixture
              },
              thirdPlayer: {
                ...playerFixture
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
            ...playerFixture
          },
          thirdPlayer: {
            ...playerFixture
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
              ...playerFixture
            }
          },
          clientActions.SET_PLAYER_SPICE({ playerId: 'test', spice: 666 })
        )
      ).toEqual({
        test: {
          ...playerFixture,
          spice: 666
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
              ...playerFixture
            }
          },
          clientActions.SET_PLAYER_ORDER({
            playerId: 'test',
            playerOrder: ['test', 'hello']
          })
        )
      ).toEqual({
        test: {
          ...playerFixture
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
              ...playerFixture
            }
          },
          clientActions.SET_FIRST_PLAYER({
            playerId: 'test',
            firstPlayerIndex: 1
          })
        )
      ).toEqual({
        test: {
          ...playerFixture
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
              ...playerFixture
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
          treacheryCards: 3
        }
      })
    })
  })
  describe('GO_TO_NEXUS', () => {
    it('updates the player', () => {
      expect(
        playersReducer(
          {
            player1: {
              ...playerFixture,
              id: 'player1',
              isAdmin: true
            },
            player2: {
              ...playerFixture,
              id: 'player2'
            },
            player3: {
              ...playerFixture,
              id: 'player3'
            }
          },
          clientActions.GO_TO_NEXUS({
            playerId: 'test'
          })
        )
      ).toEqual({
        player1: {
          ...playerFixture,
          id: 'player1',
          isAdmin: true
        },
        player2: {
          ...playerFixture,
          id: 'player2'
        },
        player3: {
          ...playerFixture,
          id: 'player3'
        }
      })
    })
  })
})
