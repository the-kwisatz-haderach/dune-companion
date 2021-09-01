import { Factions } from './faction'
import { Game } from './game'

export type RuleSet = {
  name: string
  description: string
  isAdvanced: boolean
  faction?: Factions
  inclusionCondition?: (game: Game) => boolean
  inclusionReason?: string
}
