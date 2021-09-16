import { ReactElement, useMemo } from 'react'
import { useGame, useGameActions, usePlayer } from '../../dune-react'
import CommonPhases from './Common'
import { createRuleFilter } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import {
  commonRuleSets,
  factionRuleSets,
  Factions,
  RuleSection
} from '@dune-companion/engine'
import { Loading } from '../Loading'
import { withTransition } from '../../hocs/withTransition'
import GameActionMenu, { Props as GameActionMenuProps } from './GameActionMenu'
import useGameSettingsContext from '../../contexts/GameSettingsContext/GameSettingsContext'

const CommonPhaseWithTransition = withTransition(CommonPhases, ({ phase }) => (
  <Loading phase={phase} />
))

const CommonActionMenu = () => {
  const player = usePlayer()
  const actions = useGameActions()
  const { showAllFactionRules, dispatch } = useGameSettingsContext()

  const filters: GameActionMenuProps['filters'] = [
    {
      label: 'Show All Factions Rules',
      onClick: () =>
        dispatch({
          type: 'updateRuleVisibility',
          payload: !showAllFactionRules
        }),
      selectable: true,
      selected: showAllFactionRules
    }
  ]

  const secondaryActions: GameActionMenuProps['secondaryActions'] = player.actions
    .filter(action => !action.isRequired && actions[action.type] !== undefined)
    .map(({ type }) => ({
      label: actions[type]?.label as string,
      onClick: actions[type]?.handler as () => void
    }))

  const primaryAction = useMemo(() => {
    const action = actions[player.actions.slice(-1)[0].type]
    return (
      action && {
        label: action.label,
        onClick: action.handler,
        style: action.style
      }
    )
  }, [actions, player.actions])

  return (
    <GameActionMenu
      primaryAction={primaryAction}
      filters={filters}
      secondaryActions={secondaryActions}
    />
  )
}

function GamePhase(): ReactElement {
  const { showAllFactionRules } = useGameSettingsContext()
  const game = useGame()
  const player = usePlayer()

  const ruleFilter = useMemo(
    () =>
      createRuleFilter({
        game,
        playerFaction: player.faction,
        showAllFactions: showAllFactionRules
      }),
    [game, player.faction, showAllFactionRules]
  )

  const currentPhaseRules: RuleSection[] = [
    ...commonRuleSets[game.currentPhase]?.map(section => ({
      ...section,
      rules: section?.rules?.filter(ruleFilter)
    })),
    {
      title: 'Faction Rules',
      rules: Object.values(game.players)
        .map(player => player.faction)
        .filter((faction): faction is Factions => faction !== null)
        .flatMap(faction => factionRuleSets[faction][game.currentPhase])
        .filter(ruleFilter)
    }
  ]

  if (game.currentPhase === 'FACTION_SELECT') {
    return <FactionSelect />
  }

  return (
    <CommonPhaseWithTransition
      phase={game.currentPhase}
      rules={currentPhaseRules}
      trigger={game.currentPhase}
      ActionMenu={CommonActionMenu}
    />
  )
}

export default GamePhase
