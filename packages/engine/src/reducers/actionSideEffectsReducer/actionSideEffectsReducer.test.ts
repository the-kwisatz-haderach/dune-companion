import {
  createFinishedGameState,
  createNewAuctionState,
  createNewTurnState,
  createNextPhaseState
} from '../..'
import { getActionProperties } from '../../factories/getActionProperties'
import { getPhaseActionProperties } from '../../factories/getPhaseActionProperties'
import { Factions, Game } from '../../models'
import { playerFixture } from '../../models/__fixtures__'
import { initialGameState } from '../initialGameState'
import { actionSideEffectsReducer } from './actionSideEffectsReducer'

describe('actionSideEffectsReducer', () => {
  describe("when some players haven't completed the phase", () => {
    it('returns the input state', () => {
      const state: Game = {
        ...initialGameState,
        currentPhase: 'REVIVAL',
        players: {
          somePlayer: {
            ...playerFixture,
            hasCompletedPhase: true
          },
          anotherPlayer: {
            ...playerFixture,
            hasCompletedPhase: false
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
    it('goes to the next phase', () => {
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
            actions: [],
            hasCompletedPhase: true
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 2,
            treacheryCards: 1,
            faction: Factions.HOUSE_ATREIDES,
            hasCompletedPhase: true,
            actions: [getActionProperties('SET_IS_NOT_READY')]
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual(
        createNextPhaseState(state)
      )
    })
  })

  describe('when SETUP is completed', () => {
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
            hasCompletedPhase: true,
            actions: [getActionProperties('MARK_PHASE_STEP_NOT_COMPLETED')]
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 2,
            treacheryCards: 1,
            hasCompletedPhase: true,
            faction: Factions.HOUSE_ATREIDES,
            actions: []
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual(createNewTurnState(state))
    })
  })

  describe('BIDDING', () => {
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
              treacheryCards: 2,
              hasCompletedPhase: true
            },
            anotherPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'anotherPlayer',
              spice: 1,
              hasCompletedPhase: true,
              treacheryCards: 3
            },
            thirdPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'thirdPlayer',
              spice: 1,
              hasCompletedPhase: true,
              treacheryCards: 3
            },
            fourthPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'fourthPlayer',
              spice: 1,
              hasCompletedPhase: true,
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
              treacheryCards: 4,
              hasCompletedPhase: true
            },
            anotherPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'anotherPlayer',
              spice: 1,
              faction: Factions.HOUSE_HARKONNEN,
              hasCompletedPhase: true,
              treacheryCards: 6
            },
            thirdPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'thirdPlayer',
              hasCompletedPhase: true,
              spice: 1,
              treacheryCards: 4
            },
            fourthPlayer: {
              ...playerFixture,
              isAdmin: false,
              id: 'fourthPlayer',
              hasCompletedPhase: true,
              spice: 1,
              treacheryCards: 3
            }
          }
        }
        expect(actionSideEffectsReducer(state)).toEqual(
          createNewAuctionState(state)
        )
      })
    })
  })

  describe('when all players have completed the current phase', () => {
    it('sets up a new phase', () => {
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
            hasCompletedPhase: true,
            treacheryCards: 0,
            faction: Factions.FREMEN
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 0,
            hasCompletedPhase: true,
            treacheryCards: 0,
            faction: Factions.HOUSE_ATREIDES
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual(
        createNextPhaseState(state)
      )
    })
  })
  describe('when MENTAT PAUSE is completed', () => {
    it('sets up a new turn', () => {
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
            hasCompletedPhase: true,
            faction: Factions.FREMEN
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 0,
            treacheryCards: 0,
            hasCompletedPhase: true,
            faction: Factions.HOUSE_ATREIDES
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual(createNewTurnState(state))
    })

    describe('when the last turn has been completed', () => {
      it('sets the phase to FINISHED if the last turn was completed', () => {
        const state: Game = {
          ...initialGameState,
          maxTurns: 3,
          currentTurn: 3,
          currentPhase: 'MENTAT_PAUSE',
          players: {
            somePlayer: {
              ...playerFixture,
              hasCompletedPhase: true
            },
            anotherPlayer: {
              ...playerFixture,
              hasCompletedPhase: true
            }
          }
        }
        expect(actionSideEffectsReducer(state)).toEqual(
          createFinishedGameState(state)
        )
      })
      it('only sets the finished status to true if the last phase of the last turn was completed', () => {
        const state: Game = {
          ...initialGameState,
          maxTurns: 3,
          currentTurn: 3,
          currentPhase: 'BATTLE',
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
        expect(actionSideEffectsReducer(state)).toEqual(
          createNextPhaseState(state)
        )
      })
    })
  })
})
