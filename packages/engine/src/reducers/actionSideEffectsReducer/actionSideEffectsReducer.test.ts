import { getActionProperties } from '../../factories/getActionProperties'
import { getPhaseActionProperties } from '../../factories/getPhaseActionProperties'
import { Factions, Game } from '../../models'
import { playerFixture } from '../../models/__fixtures__'
import { initialGameState } from '../initialGameState'
import { actionSideEffectsReducer } from './actionSideEffectsReducer'

describe('actionSideEffectsReducer', () => {
  describe('when there are required actions remaining', () => {
    it('returns the input state', () => {
      const state: Game = {
        ...initialGameState,
        currentPhase: 'REVIVAL',
        players: {
          somePlayer: {
            ...playerFixture,
            actions: [getActionProperties('SELECT_FACTION')]
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual(state)
    })
  })
  describe('when there are no players', () => {
    it('returns the input state', () => {
      expect(actionSideEffectsReducer(initialGameState)).toEqual(
        initialGameState
      )
    })
  })
  describe('when FACTION_SELECT is complete', () => {
    it('goes to the SETUP phase', () => {
      const state: Game = {
        ...initialGameState,
        currentPhase: 'FACTION_SELECT',
        players: {
          somePlayer: {
            ...playerFixture,
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 5,
            treacheryCards: 3,
            faction: Factions.FREMEN,
            actions: []
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 2,
            treacheryCards: 1,
            faction: Factions.HOUSE_ATREIDES,
            actions: [getActionProperties('SET_IS_NOT_READY')]
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual({
        ...state,
        currentTurn: 0,
        currentPhase: 'SETUP',
        players: {
          ...state.players,
          somePlayer: {
            ...state.players.somePlayer,
            spice: 5,
            treacheryCards: 3,
            actions: getPhaseActionProperties('SETUP', true)
          },
          anotherPlayer: {
            ...state.players.anotherPlayer,
            spice: 2,
            treacheryCards: 1,
            actions: getPhaseActionProperties('SETUP', false)
          }
        }
      })
    })
  })

  describe('when SETUP is completed and there are no required actions left', () => {
    it("sets up the game's starting conditions", () => {
      const state: Game = {
        ...initialGameState,
        currentPhase: 'SETUP',
        currentFirstPlayer: 4,
        players: {
          somePlayer: {
            ...playerFixture,
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 5,
            treacheryCards: 3,
            faction: Factions.FREMEN,
            actions: [getActionProperties('MARK_PHASE_STEP_NOT_COMPLETED')]
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 2,
            treacheryCards: 1,
            faction: Factions.HOUSE_ATREIDES,
            actions: []
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual({
        ...state,
        currentTurn: 1,
        currentPhase: 'STORM',
        currentFirstPlayer: null,
        players: {
          ...state.players,
          somePlayer: {
            ...state.players.somePlayer,
            spice: 5,
            treacheryCards: 3,
            actions: getPhaseActionProperties('STORM', true)
          },
          anotherPlayer: {
            ...state.players.anotherPlayer,
            spice: 2,
            treacheryCards: 1,
            actions: getPhaseActionProperties('STORM')
          }
        }
      })
    })
  })

  describe('when there are no pending actions left in the BIDDING phase', () => {
    describe('when the auction has not been held', () => {
      it('sets up the game for an auction', () => {
        const state: Game = {
          ...initialGameState,
          currentTurn: 2,
          currentFirstPlayer: 1,
          playerOrder: [
            'somePlayer',
            'anotherPlayer',
            'thirdPlayer',
            'fourthPlayer'
          ],
          currentPhase: 'BIDDING',
          auctions: [
            {
              isDone: true,
              participants: ['somePlayer', 'anotherPlayer'],
              rounds: [
                {
                  bids: [],
                  currentBidderIndex: 0,
                  skipped: ['anotherPlayer']
                }
              ]
            }
          ],
          players: {
            somePlayer: {
              ...playerFixture,
              isAdmin: true,
              id: 'somePlayer',
              spice: 5,
              treacheryCards: 2
            },
            anotherPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'anotherPlayer',
              spice: 1,
              treacheryCards: 3
            },
            thirdPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'thirdPlayer',
              spice: 1,
              treacheryCards: 3
            },
            fourthPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'fourthPlayer',
              spice: 1,
              treacheryCards: 3
            }
          }
        }
        expect(actionSideEffectsReducer(state)).toEqual({
          ...state,
          players: {
            somePlayer: {
              ...state.players.somePlayer,
              actions: [
                getActionProperties('PLACE_BID'),
                getActionProperties('SKIP_BID')
              ]
            },
            anotherPlayer: {
              ...state.players.anotherPlayer,
              actions: [
                getActionProperties('PLACE_BID'),
                getActionProperties('SKIP_BID')
              ]
            },
            thirdPlayer: {
              ...state.players.thirdPlayer,
              actions: [
                getActionProperties('PLACE_BID'),
                getActionProperties('SKIP_BID')
              ]
            },
            fourthPlayer: {
              ...state.players.fourthPlayer,
              actions: [
                getActionProperties('PLACE_BID'),
                getActionProperties('SKIP_BID')
              ]
            }
          },
          auctions: [
            ...state.auctions,
            {
              isDone: false,
              participants: [
                'anotherPlayer',
                'thirdPlayer',
                'fourthPlayer',
                'somePlayer'
              ],
              rounds: [
                {
                  bids: [],
                  skipped: [],
                  currentBidderIndex: 0
                }
              ]
            }
          ]
        })
      })
      it("doesn't add players who already have maximum number of treachery cards", () => {
        const state: Game = {
          ...initialGameState,
          currentTurn: 1,
          currentFirstPlayer: 2,
          playerOrder: [
            'somePlayer',
            'anotherPlayer',
            'thirdPlayer',
            'fourthPlayer'
          ],
          currentPhase: 'BIDDING',
          auctions: [],
          players: {
            somePlayer: {
              ...playerFixture,
              isAdmin: true,
              id: 'somePlayer',
              spice: 5,
              treacheryCards: 4
            },
            anotherPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'anotherPlayer',
              spice: 1,
              faction: Factions.HOUSE_HARKONNEN,
              treacheryCards: 6
            },
            thirdPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'thirdPlayer',
              spice: 1,
              treacheryCards: 4
            },
            fourthPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'fourthPlayer',
              spice: 1,
              treacheryCards: 3
            }
          }
        }
        expect(actionSideEffectsReducer(state)).toEqual({
          ...state,
          players: {
            ...state.players,
            anotherPlayer: {
              ...state.players.anotherPlayer,
              actions: [
                getActionProperties('PLACE_BID'),
                getActionProperties('SKIP_BID')
              ]
            },
            fourthPlayer: {
              ...state.players.fourthPlayer,
              actions: [
                getActionProperties('PLACE_BID'),
                getActionProperties('SKIP_BID')
              ]
            }
          },
          auctions: [
            ...state.auctions,
            {
              isDone: false,
              participants: ['fourthPlayer', 'anotherPlayer'],
              rounds: [
                {
                  bids: [],
                  skipped: [],
                  currentBidderIndex: 0
                }
              ]
            }
          ]
        })
      })
    })
  })

  describe('when the game is ongoing and there are no awaiting actions', () => {
    it('increments the currentPhase and updates player actions according to the new phase', () => {
      const state: Game = {
        ...initialGameState,
        currentTurn: 3,
        currentPhase: 'CHOAM_CHARITY',
        phaseStates: {
          ...initialGameState.phaseStates,
          CHOAM_CHARITY: {
            isChoamCharityDistributed: true
          }
        },
        players: {
          somePlayer: {
            ...playerFixture,
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.FREMEN
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.HOUSE_ATREIDES
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual({
        ...state,
        players: {
          somePlayer: {
            ...playerFixture,
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.FREMEN,
            actions: getPhaseActionProperties('BIDDING', true)
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.HOUSE_ATREIDES,
            actions: getPhaseActionProperties('BIDDING')
          }
        },
        currentTurn: 3,
        currentPhase: 'BIDDING',
        phaseStates: {
          ...initialGameState.phaseStates,
          CHOAM_CHARITY: {
            isChoamCharityDistributed: true
          }
        }
      })
    })
    it('sets up a new turn if the last phase was completed', () => {
      const state: Game = {
        ...initialGameState,
        currentTurn: 3,
        currentFirstPlayer: 1,
        currentPhase: 'MENTAT_PAUSE', // Mentat pause is the last phase of the game.
        phaseStates: {
          ...initialGameState.phaseStates,
          BIDDING: {
            isAuctionCompleted: true,
            isSpiceConfigured: false,
            isTreacheryDeclared: true
          },
          CHOAM_CHARITY: {
            isChoamCharityDistributed: false
          }
        },
        players: {
          somePlayer: {
            ...playerFixture,
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.FREMEN
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.HOUSE_ATREIDES
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual({
        ...state,
        currentFirstPlayer: null,
        players: {
          ...state.players,
          somePlayer: {
            ...state.players.somePlayer,
            actions: getPhaseActionProperties('STORM', true)
          },
          anotherPlayer: {
            ...state.players.anotherPlayer,
            actions: getPhaseActionProperties('STORM')
          }
        },
        currentTurn: 4,
        phaseStates: initialGameState.phaseStates,
        currentPhase: 'STORM' // Storm is the first phase of the game.
      })
    })
    it('sets the phase to FINISHED if the last turn was completed', () => {
      const state: Game = {
        ...initialGameState,
        conditions: {
          ...initialGameState.conditions,
          maxTurns: 3
        },
        currentTurn: 3,
        currentPhase: 'MENTAT_PAUSE',
        players: {
          somePlayer: {
            ...playerFixture
          },
          anotherPlayer: {
            ...playerFixture
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual({
        ...state,
        currentTurn: 3,
        currentPhase: 'FINISHED'
      })
    })
    it('only sets the finished status to true if the last phase of the last turn was completed', () => {
      const state: Game = {
        ...initialGameState,
        conditions: {
          ...initialGameState.conditions,
          maxTurns: 3
        },
        currentTurn: 3,
        currentPhase: 'BATTLE',
        players: {
          somePlayer: {
            ...playerFixture,
            id: 'somePlayer'
          },
          anotherPlayer: {
            ...playerFixture,
            id: 'anotherPlayer'
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual({
        ...state,
        currentTurn: 3,
        currentPhase: 'SPICE_HARVEST',
        players: {
          somePlayer: {
            ...playerFixture,
            id: 'somePlayer',
            actions: getPhaseActionProperties('SPICE_HARVEST')
          },
          anotherPlayer: {
            ...playerFixture,
            id: 'anotherPlayer',
            actions: getPhaseActionProperties('SPICE_HARVEST')
          }
        }
      })
    })
  })
})
