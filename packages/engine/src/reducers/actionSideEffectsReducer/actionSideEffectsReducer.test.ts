import {
  factions,
  requiredPhaseActions,
  requiredPhaseAdminActions
} from '../../dictionaries'
import { getActionProperties } from '../../factories/getActionProperties'
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
  describe('when setup is completed and there are no required actions left', () => {
    it("sets up the game's starting conditions", () => {
      const state: Game = {
        ...initialGameState,
        currentPhase: 'SETUP',
        players: {
          somePlayer: {
            ...playerFixture,
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.FREMEN,
            actions: [getActionProperties('MARK_PHASE_STEP_NOT_COMPLETED')]
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.HOUSE_ATREIDES,
            actions: []
          }
        }
      }
      expect(actionSideEffectsReducer(state)).toEqual({
        ...state,
        currentTurn: 1,
        currentPhase: 'STORM',
        players: {
          ...state.players,
          somePlayer: {
            ...state.players.somePlayer,
            spice: factions.FREMEN.startingSpice,
            treacheryCards: factions.FREMEN.startingItems,
            actions: [
              ...requiredPhaseActions.STORM.map(type =>
                getActionProperties(type)
              ),
              ...requiredPhaseAdminActions.STORM.map(type =>
                getActionProperties(type)
              )
            ]
          },
          anotherPlayer: {
            ...state.players.anotherPlayer,
            spice: factions.HOUSE_ATREIDES.startingSpice,
            treacheryCards: factions.HOUSE_ATREIDES.startingItems,
            actions: requiredPhaseActions.STORM.map(type =>
              getActionProperties(type)
            )
          }
        }
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
            actions: requiredPhaseActions.BIDDING.map(type =>
              getActionProperties(type)
            )
          },
          anotherPlayer: {
            ...playerFixture,
            isAdmin: false,
            id: 'anotherPlayer',
            name: 'anotherPlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.HOUSE_ATREIDES,
            actions: requiredPhaseActions.BIDDING.map(type =>
              getActionProperties(type)
            )
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
        players: {
          ...state.players,
          somePlayer: {
            ...state.players.somePlayer,
            actions: [
              ...requiredPhaseActions.STORM.map(type =>
                getActionProperties(type)
              ),
              ...requiredPhaseAdminActions.STORM.map(type =>
                getActionProperties(type)
              )
            ]
          },
          anotherPlayer: {
            ...state.players.anotherPlayer,
            actions: requiredPhaseActions.STORM.map(type =>
              getActionProperties(type)
            )
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
            actions: requiredPhaseActions.SPICE_HARVEST.map(type =>
              getActionProperties(type)
            )
          },
          anotherPlayer: {
            ...playerFixture,
            id: 'anotherPlayer',
            actions: requiredPhaseActions.SPICE_HARVEST.map(type =>
              getActionProperties(type)
            )
          }
        }
      })
    })
  })
})
