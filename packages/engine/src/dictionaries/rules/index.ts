import { Factions, Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'
import { beneGesseritRules } from './beneGesserit'
import { atreidesRules } from './atreides'
import { emperorRules } from './emperor'
import { fremenRules } from './fremen'
import { harkonnenRules } from './harkonnen'
import { spacingGuildRules } from './spacingGuild'

export { commonRuleSet } from './common'

export const factionRuleSets: Record<Factions, Record<Phases, RuleSet[]>> = {
  BENE_GESSERIT: beneGesseritRules,
  EMPEROR: emperorRules,
  FREMEN: fremenRules,
  HOUSE_ATREIDES: atreidesRules,
  HOUSE_HARKONNEN: harkonnenRules,
  SPACING_GUILD: spacingGuildRules
}
