import { Factions } from './faction'
import { Game } from './game'

export type RuleSet = {
  name: string
  description: string
  isAdvanced: boolean
  faction?: Factions
  inclusionCondition?: (
    conditions: Pick<Game, 'currentPhase' | 'currentTurn'>
  ) => boolean
  inclusionReason?: string
}

export type RuleSection = {
  title: string
  description?: string
  rules: RuleSet[]
}
