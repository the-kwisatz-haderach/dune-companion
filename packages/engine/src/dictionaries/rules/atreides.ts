import { Factions, Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'

export const atreidesRules: Record<Phases, RuleSet[]> = {
  SETUP: [],
  STORM: [],
  SPICE_BLOW_AND_NEXUS: [],
  CHOAM_CHARITY: [],
  BIDDING: [
    {
      name: 'Bidding',
      description:
        'During the bidding round, you may look at each Treachery Card as it comes up for purchase before any faction bids on it. You, and only you, may keep written records about cards.',
      isAdvanced: false,
      faction: Factions.HOUSE_ATREIDES
    }
  ],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [
    {
      name: 'Movement',
      description:
        'At the start of the Movement Phase, before anyone moves, you may look at the top card of the Spice Deck.',
      isAdvanced: false,
      faction: Factions.HOUSE_ATREIDES
    }
  ],
  BATTLE: [
    {
      name: 'Battle',
      description:
        'During the Battle Phase, you may force your opponent to reveal your choice of one of the four elements they will use in their Battle Plan against you: the leader, the weapon, the defense, or the number dialed. If you choose to ask about a weapon or defense and your opponent tells you that they are not playing that element during this battle, you may not then ask to see a different element.',
      isAdvanced: false,
      faction: Factions.HOUSE_ATREIDES
    }
  ],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [],
  FINISHED: []
}
