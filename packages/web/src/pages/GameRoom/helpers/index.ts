import {
  ClientActionType,
  Factions,
  Game,
  Phases,
  Player,
  RuleSet
} from '@dune-companion/engine'

export const createPendingActionsChecker = (players: Game['players']) => {
  const checker = (playerIds: string[], actionType: ClientActionType) =>
    playerIds.some(id =>
      players[id].actions.some(
        action => action.type === actionType && action.isRequired
      )
    )
  return (actionType: ClientActionType) => ({
    forPlayer: (playerId: Player['id']) => checker([playerId], actionType),
    forAnyPlayer: () => checker(Object.keys(players), actionType)
  })
}

type FilterConfig = {
  advancedMode: boolean
  currentPhase: Phases
  currentTurn: number
  playerFaction: Factions | null
  showAllFactions: boolean
}

export const createRuleFilter = ({
  currentPhase,
  currentTurn,
  advancedMode,
  playerFaction,
  showAllFactions
}: FilterConfig) => (rule: RuleSet) => {
  if (!advancedMode && rule.isAdvanced) return false
  if (
    !showAllFactions &&
    rule.faction !== undefined &&
    rule.faction !== playerFaction
  )
    return false
  if (
    rule?.inclusionCondition &&
    !rule?.inclusionCondition({ currentTurn, currentPhase })
  )
    return false
  return true
}
