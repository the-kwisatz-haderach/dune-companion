import { Factions, Phases, RuleSection } from '../../models'
import { RuleSet } from '../../models/ruleSet'
import { beneGesseritRules } from './beneGesserit'
import { atreidesRules } from './atreides'
import { emperorRules } from './emperor'
import { fremenRules } from './fremen'
import { harkonnenRules } from './harkonnen'
import { spacingGuildRules } from './spacingGuild'
import { setupRules } from './setup'
import { stormRules } from './storm'
import { spiceBlowAndNexusRules } from './spiceBlowAndNexus'
import { choamCharityRules } from './choamCharity'
import { biddingRules } from './bidding'
import { revivalRules } from './revival'
import { shipmentAndMovementRules } from './shipmentAndMovement'
import { battleRules } from './battle'
import { spiceHarvestRules } from './spiceHarvest'
import { mentatPauseRules } from './mentatPause'

export const commonRuleSets: Record<Phases, RuleSection[]> = {
  FACTION_SELECT: [],
  SETUP: setupRules,
  STORM: stormRules,
  SPICE_BLOW_AND_NEXUS: spiceBlowAndNexusRules,
  NEXUS: [],
  CHOAM_CHARITY: choamCharityRules,
  BIDDING: biddingRules,
  REVIVAL: revivalRules,
  SHIPMENT_AND_MOVEMENT: shipmentAndMovementRules,
  BATTLE: battleRules,
  SPICE_HARVEST: spiceHarvestRules,
  MENTAT_PAUSE: mentatPauseRules,
  FINISHED: []
}

export const factionRuleSets: Record<Factions, Record<Phases, RuleSet[]>> = {
  BENE_GESSERIT: beneGesseritRules,
  EMPEROR: emperorRules,
  FREMEN: fremenRules,
  HOUSE_ATREIDES: atreidesRules,
  HOUSE_HARKONNEN: harkonnenRules,
  SPACING_GUILD: spacingGuildRules
}
