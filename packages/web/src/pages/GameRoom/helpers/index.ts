import {
  ClientActionType,
  Factions,
  Game,
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

export const createRuleFilter = (config: {
  game: Game
  playerFaction: Factions | null
  showAllFactions: boolean
}) => (rule: RuleSet) => {
  if (!config.game.conditions.advancedMode && rule.isAdvanced) return false
  if (
    !config.showAllFactions &&
    rule.faction !== undefined &&
    rule.faction !== config.playerFaction
  )
    return false
  if (rule?.inclusionCondition && !rule?.inclusionCondition(config.game))
    return false
  return true
}
