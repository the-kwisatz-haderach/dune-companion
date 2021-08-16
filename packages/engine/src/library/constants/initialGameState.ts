import { Game } from '../../models'
import { phases } from './phases'

export const initialGameState: Game = {
  players: {},
  playerOrder: [],
  awaitingAction: [],
  conditions: {
    advancedMode: false,
    maxPlayers: 6,
    maxTurns: 10
  },
  availableActions: {},
  currentTurn: 0,
  currentFirstPlayer: 0,
  currentPhase: 0,
  auctions: [],
  allianceRequests: [],
  alliances: [],
  notifications: [],
  phases
}
