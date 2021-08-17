export enum Phases {
  STORM,
  SPICE_BLOW_AND_NEXUS,
  CHOAM_CHARITY,
  BIDDING,
  REVIVAL,
  SHIPMENT_AND_MOVEMENT,
  BATTLE,
  SPICE_HARVEST,
  MENTAT_PAUSE
}

// Can be used for checklist. Warn before proceeding if something is not completed.
export type PhaseStates = {
  [Phases.STORM]: {
    isStormMarkerMoved: boolean
    isDamageDealt: boolean
    isFirstPlayerDetermined: boolean
  }
  [Phases.SPICE_BLOW_AND_NEXUS]: {
    isTopCardTurned: boolean
    isSpicePlacedOnTerritory: boolean
    isNexusCompleted: boolean
  }
  [Phases.CHOAM_CHARITY]: {
    isChoamCharityDistributed: boolean
  }
  [Phases.BIDDING]: {
    isTreacheryDeclared: boolean
    isSpiceConfigured: boolean
    isAuctionCompleted: boolean
  }
  [Phases.REVIVAL]: {
    isRevivalCompleted: boolean
  }
  [Phases.SHIPMENT_AND_MOVEMENT]: {
    isMovementCompleted: boolean
  }
  [Phases.BATTLE]: {
    isBattlesCompleted: boolean
  }
  [Phases.SPICE_HARVEST]: {
    isSpiceCollected: boolean
  }
  [Phases.MENTAT_PAUSE]: {
    isWinnerDetermined: boolean
  }
}

export type Phase = {
  name: string
  description: string
}
