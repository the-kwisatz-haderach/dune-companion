import { Factions, Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'

export const emperorRules: Record<Phases, RuleSet[]> = {
  SETUP: [],
  STORM: [],
  SPICE_BLOW_AND_NEXUS: [],
  CHOAM_CHARITY: [],
  BIDDING: [
    {
      name: 'Bidding',
      description:
        'Whenever any other faction pays spice for a Treachery Card, they pay it to you instead of the Spice Bank. You may not discount the price of Treachery Cards; the full price must be paid.',
      isAdvanced: false,
      faction: Factions.EMPEROR
    }
  ],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [],
  BATTLE: [],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [],
  FINISHED: []
}
