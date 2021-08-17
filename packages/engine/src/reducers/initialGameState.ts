import { Game } from '../models'

export const initialGameState: Game = {
  isFinished: false,
  players: {},
  playerOrder: [],
  awaitingAction: [],
  conditions: {
    advancedMode: false,
    maxPlayers: 6,
    maxTurns: 10
  },
  currentTurn: 0,
  currentFirstPlayer: 0,
  currentPhase: 'STORM',
  auctions: [],
  allianceRequests: [],
  alliances: [],
  phaseStates: {
    STORM: {
      isStormMarkerMoved: false,
      isDamageDealt: false,
      isFirstPlayerDetermined: false
    },
    SPICE_BLOW_AND_NEXUS: {
      isTopCardTurned: false,
      isSpicePlacedOnTerritory: false,
      isNexusCompleted: false
    },
    CHOAM_CHARITY: {
      isChoamCharityDistributed: false
    },
    BIDDING: {
      isTreacheryDeclared: false,
      isSpiceConfigured: false,
      isAuctionCompleted: false
    },
    REVIVAL: {
      isRevivalCompleted: false
    },
    SHIPMENT_AND_MOVEMENT: {
      isMovementCompleted: false
    },
    BATTLE: {
      isBattlesCompleted: false
    },
    SPICE_HARVEST: {
      isSpiceCollected: false
    },
    MENTAT_PAUSE: {
      isWinnerDetermined: false
    }
  }
}
