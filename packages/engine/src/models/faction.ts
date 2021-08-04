import { Cities } from './city'

type FactionPower = {}

export type Faction = {
  name: string
  shorthand: string
  description: string
  powers: FactionPower[]
  itemsAllowed: number
  freeRevivals: number
  startingSpice: number
  startingItems: number
  strategyHint: string
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
