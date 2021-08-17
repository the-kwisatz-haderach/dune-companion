import { Game, Phases } from '../models'

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
  currentPhase: 0,
  auctions: [],
  allianceRequests: [],
  alliances: [],
  phaseStates: {
    [Phases.STORM]: {
      isStormMarkerMoved: false,
      isDamageDealt: false,
      isFirstPlayerDetermined: false
    },
    [Phases.SPICE_BLOW_AND_NEXUS]: {
      isTopCardTurned: false,
      isSpicePlacedOnTerritory: false,
      isNexusCompleted: false
    },
    [Phases.CHOAM_CHARITY]: {
      isChoamCharityDistributed: false
    },
    [Phases.BIDDING]: {
      isTreacheryDeclared: false,
      isSpiceConfigured: false,
      isAuctionCompleted: false
    },
    [Phases.REVIVAL]: {
      isRevivalCompleted: false
    },
    [Phases.SHIPMENT_AND_MOVEMENT]: {
      isMovementCompleted: false
    },
    [Phases.BATTLE]: {
      isBattlesCompleted: false
    },
    [Phases.SPICE_HARVEST]: {
      isSpiceCollected: false
    },
    [Phases.MENTAT_PAUSE]: {
      isWinnerDetermined: false
    }
  }
}
