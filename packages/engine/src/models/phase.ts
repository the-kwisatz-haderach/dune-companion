export type Phases =
  | 'FACTION_SELECT'
  | 'SETUP'
  | 'STORM'
  | 'SPICE_BLOW_AND_NEXUS'
  | 'NEXUS'
  | 'CHOAM_CHARITY'
  | 'BIDDING'
  | 'REVIVAL'
  | 'SHIPMENT_AND_MOVEMENT'
  | 'BATTLE'
  | 'SPICE_HARVEST'
  | 'MENTAT_PAUSE'
  | 'FINISHED'

// Can be used for checklist. Warn before proceeding if something is not completed.
export type PhaseStates = {
  FACTION_SELECT: {
    isFactionsSelected: boolean
  }
  SETUP: {
    isPositioningDone: boolean
    isTraitorsDistributed: boolean
    isSpiceDistributed: boolean
    isForcesPlaced: boolean
    isTreacheryCardsDealt: boolean
  }
  STORM: {
    isStormMarkerMoved: boolean
    isDamageDealt: boolean
    isFirstPlayerDetermined: boolean
  }
  SPICE_BLOW_AND_NEXUS: {
    isTopCardTurned: boolean
    isSpicePlacedOnTerritory: boolean
  }
  NEXUS: {
    isNexusCompleted: boolean
  }
  CHOAM_CHARITY: {
    isChoamCharityDistributed: boolean
  }
  BIDDING: {
    isTreacheryDeclared: boolean
    isSpiceConfigured: boolean
    isAuctionCompleted: boolean
  }
  REVIVAL: {
    isRevivalCompleted: boolean
  }
  SHIPMENT_AND_MOVEMENT: {
    isMovementCompleted: boolean
  }
  BATTLE: {
    isBattlesCompleted: boolean
  }
  SPICE_HARVEST: {
    isSpiceCollected: boolean
  }
  MENTAT_PAUSE: {
    isWinnerDetermined: boolean
  }
}

export type Phase = {
  name: string
  description: string
}
