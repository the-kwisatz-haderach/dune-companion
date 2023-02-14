import { Factions, Game } from '../models'

// export const initialGameState: Game = {
//   players: {
//     qkj5cj0M0iEtbdFrrUrYN: {
//       faction: Factions.BENE_GESSERIT,
//       hasCompletedPhase: false,
//       id: 'qkj5cj0M0iEtbdFrrUrYN',
//       isAdmin: true,
//       isIdle: false,
//       name: 'Svenne',
//       spice: 5,
//       treacheryCards: 2
//     }
//   },
//   playerOrder: ['qkj5cj0M0iEtbdFrrUrYN'],
//   isAdvancedMode: false,
//   maxPlayers: 6,
//   maxTurns: 10,
//   currentTurn: 1,
//   currentFirstPlayer: 0,
//   currentPhase: 'CHOAM_CHARITY',
//   auctions: [],
//   allianceRequests: [],
//   alliances: [],
//   phaseStates: {
//     FACTION_SELECT: {
//       isFactionsSelected: false
//     },
//     SETUP: {
//       isForcesPlaced: false,
//       isPositioningDone: false,
//       isSpiceDistributed: false,
//       isTraitorsDistributed: false,
//       isTreacheryCardsDealt: false
//     },
//     STORM: {
//       isStormMarkerMoved: false,
//       isDamageDealt: false,
//       isFirstPlayerDetermined: false
//     },
//     SPICE_BLOW_AND_NEXUS: {
//       isTopCardTurned: false,
//       isSpicePlacedOnTerritory: false
//     },
//     NEXUS: {
//       isNexusCompleted: false
//     },
//     CHOAM_CHARITY: {
//       isChoamCharityDistributed: false
//     },
//     BIDDING: {
//       isTreacheryDeclared: false,
//       isSpiceConfigured: false,
//       isAuctionCompleted: false
//     },
//     REVIVAL: {
//       isRevivalCompleted: false
//     },
//     SHIPMENT_AND_MOVEMENT: {
//       isMovementCompleted: false
//     },
//     BATTLE: {
//       isBattlesCompleted: false
//     },
//     SPICE_HARVEST: {
//       isSpiceCollected: false
//     },
//     MENTAT_PAUSE: {
//       isWinnerDetermined: false
//     }
//   }
// }

export const initialGameState: Game = {
  players: {},
  playerOrder: [],
  isAdvancedMode: false,
  maxPlayers: 6,
  maxTurns: 10,
  currentTurn: 0,
  currentFirstPlayer: null,
  currentPhase: 'FACTION_SELECT',
  auctions: [],
  allianceRequests: [],
  alliances: [],
  phaseStates: {
    FACTION_SELECT: {
      isFactionsSelected: false
    },
    SETUP: {
      isForcesPlaced: false,
      isPositioningDone: false,
      isSpiceDistributed: false,
      isTraitorsDistributed: false,
      isTreacheryCardsDealt: false
    },
    STORM: {
      isStormMarkerMoved: false,
      isDamageDealt: false,
      isFirstPlayerDetermined: false
    },
    SPICE_BLOW_AND_NEXUS: {
      isTopCardTurned: false,
      isSpicePlacedOnTerritory: false
    },
    NEXUS: {
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
