import { ReactElement, useMemo, useCallback } from 'react'
import { useGame, useGameActions, usePlayer } from '../../dune-react'
import CommonPhases from './Common'
import { createPendingActionsChecker, createRuleFilter } from './helpers'
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

const CommonActionMenu = ({
  toggleShowAllPlayers
}: {
  toggleShowAllPlayers: () => void
}) => {
  const player = usePlayer()
  const actions = useGameActions()
  const { showAllFactionRules } = useGameSettingsContext()

  const filters: GameActionMenuProps['filters'] = [
    {
      label: 'Show All Factions Rules',
      onClick: toggleShowAllPlayers,
      selected: showAllFactionRules
    }
  ]
  const secondaryActions: GameActionMenuProps['secondaryActions'] = []
  if (actions.SET_FIRST_PLAYER) {
    secondaryActions.push({
      label: actions.SET_FIRST_PLAYER.label,
      onClick: actions.SET_FIRST_PLAYER.handler
    })
  }

  const primaryAction = actions[player.actions.slice(-1)[0].type]

  return (
    <GameActionMenu
      primaryAction={
        primaryAction && {
          label: primaryAction.label,
          onClick: primaryAction.handler,
          style: primaryAction.style
        }
      }
      filters={filters}
      secondaryActions={secondaryActions}
    />
  )
}

function GamePhase(): ReactElement {
  const { dispatch, showAllFactionRules } = useGameSettingsContext()
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

  const ActionMenu = useCallback(
    () => (
      <CommonActionMenu
        toggleShowAllPlayers={() =>
          dispatch({
            type: 'updateRuleVisibility',
            payload: !showAllFactionRules
          })
        }
      />
    ),
    [dispatch, showAllFactionRules]
  )

  const isPending = useMemo(() => createPendingActionsChecker(game.players), [
    game.players
  ])

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

  if (
    game.currentPhase === 'SETUP' &&
    isPending('SELECT_FACTION').forAnyPlayer()
  ) {
    return <FactionSelect />
  }

  return (
    <CommonPhaseWithTransition
      phase={game.currentPhase}
      rules={currentPhaseRules}
      trigger={game.currentPhase}
      ActionMenu={ActionMenu}
    />
  )
}

export default GamePhase
