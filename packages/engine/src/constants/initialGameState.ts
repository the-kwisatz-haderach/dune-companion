import { Game } from '../models'

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
  notifications: []
}
