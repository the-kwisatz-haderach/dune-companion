import { useMemo } from 'react'
import { useGame, useGameActions, usePlayer } from '../../../dune-react'
import PlayerOrderIcon from '@material-ui/icons/FormatListNumbered'
import FirstPlayerIcon from '@material-ui/icons/PlusOne'
import useGameSettingsContext from '../../../contexts/GameSettingsContext/GameSettingsContext'
import {
  GameActionMenu,
  GameActionMenuProps
} from '../../../components/GameActionMenu'
import {
  factionRuleSets,
  getPhaseActionProperties
} from '@dune-companion/engine'
import { Badge } from '@material-ui/core'

const getSecondaryActions = (
  actions: ReturnType<typeof useGameActions>,
  isAdmin?: boolean
) => {
  const secondaryActions: GameActionMenuProps['secondaryActions'] = []
  if (isAdmin) {
    secondaryActions.push(
      {
        label: actions.SET_PLAYER_ORDER.label,
        onClick: actions.SET_PLAYER_ORDER.handler,
        Icon: PlayerOrderIcon
      },
      {
        label: actions.SET_FIRST_PLAYER.label,
        onClick: actions.SET_FIRST_PLAYER.handler,
        Icon: FirstPlayerIcon
      }
    )
  }
  return secondaryActions
}

export const CommonActionMenu = () => {
  const player = usePlayer()
  const actions = useGameActions()
  const game = useGame()
  const { showAllFactionRules, dispatch } = useGameSettingsContext()

  const settingsMenu: GameActionMenuProps['settingsMenu'] = useMemo(
    () => [
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
    ],
    [showAllFactionRules, dispatch]
  )

  const secondaryActions: GameActionMenuProps['secondaryActions'] = useMemo(
    () =>
      getPhaseActionProperties(game.currentPhase, player.isAdmin)
        // .filter(action => action.actionType === 'secondary')
        .map((action) => {
          const currentAction = actions[action.type as keyof typeof actions]
          return {
            label: currentAction?.label,
            onClick: currentAction?.handler,
            style: currentAction?.style
          }
        }),
    [actions, player.isAdmin, game.currentPhase]
  )

  const primaryAction: GameActionMenuProps['primaryAction'] = useMemo(() => {
    const actionKey: keyof typeof actions = player.hasCompletedPhase
      ? 'SET_IS_NOT_READY'
      : 'SET_IS_READY'
    return {
      label: actions[actionKey].label,
      onClick: actions[actionKey].handler,
      style: actions[actionKey].style
    }
  }, [actions, player.hasCompletedPhase])

  return (
    <Badge
      badgeContent={
        player.faction &&
        factionRuleSets[player.faction][game.currentPhase].length
      }
      color="primary"
    >
      <GameActionMenu
        primaryAction={primaryAction}
        settingsMenu={settingsMenu}
        secondaryActions={secondaryActions}
      />
    </Badge>
  )
}
