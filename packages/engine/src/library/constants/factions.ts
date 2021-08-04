import { Cities } from '../../models/city'
import { Factions, Faction } from '../../models/faction'

export const factions: Record<Factions, Faction> = {
  BENE_GESSERIT: {
    name: 'Bene Gesserit',
    shorthand: 'BNG',
    powers: [],
    description:
      'The origins of the Bene Gesserit are not widely known. What is clear is that the Bene Gesserit arose in the political turmoil that followed the Butlerian Jihad, and quickly established themselves as an influential political force. However, during the Butlerian Jihad, the Bene Gesserit already had a Reverend Mother Superior, which seems to show that their hierarchical structure had already formed.',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 2,
    startingItems: 1,
    strategyHint: '',
    startingCity: null
  },
  HOUSE_ATREIDES: {
    name: 'House Atreides',
    shorthand: 'ATR',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 5,
    startingItems: 1,
    strategyHint: '',
    startingCity: Cities.ARRAKEEN
  },
  HOUSE_HARKONNEN: {
    name: 'House Harkonnen',
    shorthand: 'HAR',
    powers: [],
    description: '',
    itemsAllowed: 8,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategyHint: '',
    startingCity: Cities.CARTHAG
  },
  FREMEN: {
    name: 'Fremen',
    shorthand: 'FRE',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategyHint: '',
    startingCity: null
  },
  SPACING_GUILD: {
    name: 'Spacing Guild',
    shorthand: 'SGU',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategyHint: '',
    startingCity: Cities.TUEKS_SIETCH
  },
  EMPEROR: {
    name: 'Emperor',
    shorthand: 'EMP',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 6,
    startingItems: 1,
    strategyHint: '',
    startingCity: null
  }
}
