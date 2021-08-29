import { Cities } from './city'
import { RuleSet } from './ruleSet'

type Leader = {
  name: string
  strength: number
  backstory: string
}

type Commander = {
  name: string
  backstory: string
}

export type Faction = {
  name: string
  backstory: string
  commander: Commander
  leaders: Leader[]
  shorthand: string
  description: string
  alliancePower: string
  advantages: Pick<RuleSet, 'name' | 'description' | 'isAdvanced'>[]
  keyAdvantage: string
  strategy: string
  karamaPower: string
  itemsAllowed: number
  freeRevivals: number
  startingPlanetaryForces: number
  startingReserveForces: number
  startingSpice: number
  startingItems: number
  startingCity: Cities | null
}

export enum Factions {
  BENE_GESSERIT = 'BENE_GESSERIT',
  HOUSE_ATREIDES = 'HOUSE_ATREIDES',
  HOUSE_HARKONNEN = 'HOUSE_HARKONNEN',
  FREMEN = 'FREMEN',
  SPACING_GUILD = 'SPACING_GUILD',
  EMPEROR = 'EMPEROR'
}
