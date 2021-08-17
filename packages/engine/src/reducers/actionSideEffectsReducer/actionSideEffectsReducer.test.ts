import { factions } from '../../dictionaries'
import { Factions, Game, Phases } from '../../models'
import { playerFixture } from '../../models/__fixtures__'
import { initialGameState } from '../initialGameState'
import { actionSideEffectsReducer } from './actionSideEffectsReducer'

describe('actionSideEffectsReducer', () => {
  describe('when setup is completed and there are no awaiting actions', () => {
    it("sets up the game's starting conditions", () => {
      const state: Game = {
        ...initialGameState,
        players: {
          somePlayer: {
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.FREMEN
          },
          anotherPlayer: {
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
        currentTurn: 1,
        awaitingAction: ['somePlayer', 'anotherPlayer'],
        players: {
          ...state.players,
          somePlayer: {
            ...state.players.somePlayer,
            spice: factions.FREMEN.startingSpice,
            treacheryCards: factions.FREMEN.startingItems
          },
          anotherPlayer: {
            ...state.players.anotherPlayer,
            spice: factions.HOUSE_ATREIDES.startingSpice,
            treacheryCards: factions.HOUSE_ATREIDES.startingItems
          }
        }
      })
    })
  })
  describe('when the game is ongoing and there are no awaiting actions', () => {
    it('increments the currentPhase and adds all players to the awaiting action queue', () => {
      const state: Game = {
        ...initialGameState,
        currentTurn: 3,
        currentPhase: 'CHOAM_CHARITY',
        awaitingAction: [],
        phaseStates: {
          ...initialGameState.phaseStates,
          CHOAM_CHARITY: {
            isChoamCharityDistributed: true
          }
        },
        players: {
          somePlayer: {
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.FREMEN
          },
          anotherPlayer: {
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
        currentTurn: 3,
        awaitingAction: ['somePlayer', 'anotherPlayer'],
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
        awaitingAction: [],
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
            isAdmin: true,
            id: 'somePlayer',
            name: 'somePlayer',
            spice: 0,
            treacheryCards: 0,
            faction: Factions.FREMEN
          },
          anotherPlayer: {
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
        currentTurn: 4,
        awaitingAction: ['somePlayer', 'anotherPlayer'],
        phaseStates: initialGameState.phaseStates,
        currentPhase: 'STORM' // Storm is the first phase of the game.
      })
    })
    it('sets the finished status to true if the last turn was completed', () => {
      const state: Game = {
        ...initialGameState,
        conditions: {
          ...initialGameState.conditions,
          maxTurns: 3
        },
        currentTurn: 3,
        currentPhase: 'MENTAT_PAUSE',
        awaitingAction: [],
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
        isFinished: true,
        currentTurn: 3,
        awaitingAction: [],
        currentPhase: 'MENTAT_PAUSE'
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
        awaitingAction: [],
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
        isFinished: false,
        currentTurn: 3,
        awaitingAction: ['somePlayer', 'anotherPlayer'],
        currentPhase: 'SPICE_HARVEST'
      })
    })
  })
})
