import { Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'
import { beneGesseritRules } from './beneGesserit'
import { atreidesRules } from './atreides'
import { emperorRules } from './emperor'
import { fremenRules } from './fremen'
import { harkonnenRules } from './harkonnen'
import { spacingGuildRules } from './spacingGuild'
import { commonRuleSet } from './common'

export const combinedRuleSet: Record<Phases, RuleSet[]> = {
  SETUP: [
    ...commonRuleSet.SETUP,
    ...beneGesseritRules.SETUP,
    ...spacingGuildRules.SETUP,
    ...atreidesRules.SETUP,
    ...emperorRules.SETUP,
    ...fremenRules.SETUP,
    ...harkonnenRules.SETUP
  ],
  STORM: [
    ...commonRuleSet.STORM,
    ...beneGesseritRules.STORM,
    ...spacingGuildRules.STORM,
    ...atreidesRules.STORM,
    ...emperorRules.STORM,
    ...fremenRules.STORM,
    ...harkonnenRules.STORM
  ],
  SPICE_BLOW_AND_NEXUS: [
    ...commonRuleSet.SPICE_BLOW_AND_NEXUS,
    ...beneGesseritRules.SPICE_BLOW_AND_NEXUS,
    ...spacingGuildRules.SPICE_BLOW_AND_NEXUS,
    ...atreidesRules.SPICE_BLOW_AND_NEXUS,
    ...emperorRules.SPICE_BLOW_AND_NEXUS,
    ...fremenRules.SPICE_BLOW_AND_NEXUS,
    ...harkonnenRules.SPICE_BLOW_AND_NEXUS
  ],
  CHOAM_CHARITY: [
    ...commonRuleSet.CHOAM_CHARITY,
    ...beneGesseritRules.CHOAM_CHARITY,
    ...spacingGuildRules.CHOAM_CHARITY,
    ...atreidesRules.CHOAM_CHARITY,
    ...emperorRules.CHOAM_CHARITY,
    ...fremenRules.CHOAM_CHARITY,
    ...harkonnenRules.CHOAM_CHARITY
  ],
  BIDDING: [
    ...commonRuleSet.BIDDING,
    ...beneGesseritRules.BIDDING,
    ...spacingGuildRules.BIDDING,
    ...atreidesRules.BIDDING,
    ...emperorRules.BIDDING,
    ...fremenRules.BIDDING,
    ...harkonnenRules.BIDDING
  ],
  REVIVAL: [
    ...commonRuleSet.REVIVAL,
    ...beneGesseritRules.REVIVAL,
    ...spacingGuildRules.REVIVAL,
    ...atreidesRules.REVIVAL,
    ...emperorRules.REVIVAL,
    ...fremenRules.REVIVAL,
    ...harkonnenRules.REVIVAL
  ],
  SHIPMENT_AND_MOVEMENT: [
    ...commonRuleSet.SHIPMENT_AND_MOVEMENT,
    ...beneGesseritRules.SHIPMENT_AND_MOVEMENT,
    ...spacingGuildRules.SHIPMENT_AND_MOVEMENT,
    ...atreidesRules.SHIPMENT_AND_MOVEMENT,
    ...emperorRules.SHIPMENT_AND_MOVEMENT,
    ...fremenRules.SHIPMENT_AND_MOVEMENT,
    ...harkonnenRules.SHIPMENT_AND_MOVEMENT
  ],
  BATTLE: [
    ...commonRuleSet.BATTLE,
    ...beneGesseritRules.BATTLE,
    ...spacingGuildRules.BATTLE,
    ...atreidesRules.BATTLE,
    ...emperorRules.BATTLE,
    ...fremenRules.BATTLE,
    ...harkonnenRules.BATTLE
  ],
  SPICE_HARVEST: [
    ...commonRuleSet.SPICE_HARVEST,
    ...beneGesseritRules.SPICE_HARVEST,
    ...spacingGuildRules.SPICE_HARVEST,
    ...atreidesRules.SPICE_HARVEST,
    ...emperorRules.SPICE_HARVEST,
    ...fremenRules.SPICE_HARVEST,
    ...harkonnenRules.SPICE_HARVEST
  ],
  MENTAT_PAUSE: [
    ...commonRuleSet.MENTAT_PAUSE,
    ...beneGesseritRules.MENTAT_PAUSE,
    ...spacingGuildRules.MENTAT_PAUSE,
    ...atreidesRules.MENTAT_PAUSE,
    ...emperorRules.MENTAT_PAUSE,
    ...fremenRules.MENTAT_PAUSE,
    ...harkonnenRules.MENTAT_PAUSE
  ],
  FINISHED: [
    ...commonRuleSet.FINISHED,
    ...beneGesseritRules.FINISHED,
    ...spacingGuildRules.FINISHED,
    ...atreidesRules.FINISHED,
    ...emperorRules.FINISHED,
    ...fremenRules.FINISHED,
    ...harkonnenRules.FINISHED
  ]
}
