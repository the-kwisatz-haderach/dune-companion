import { useMemo } from 'react'
import { useGameActions, usePlayer } from '../../../dune-react'
import PlayerOrderIcon from '@material-ui/icons/FormatListNumbered'
import FirstPlayerIcon from '@material-ui/icons/PlusOne'
import useGameSettingsContext from '../../../contexts/GameSettingsContext/GameSettingsContext'
import {
  GameActionMenu,
  GameActionMenuProps
} from '../../../components/GameActionMenu'
import { Player } from '@dune-companion/engine'

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

const getPrimaryAction = (
  actions: ReturnType<typeof useGameActions>,
  playerActions: Player['actions']
) => {
  const action =
    actions[
      playerActions.filter(
        action => action.isRequired || action.type === 'SET_IS_NOT_READY'
      )[0]?.type as keyof typeof actions
    ]
  if (!action) return
  return {
    label: action.label,
    onClick: action.handler,
    style: action.style
  }
}

export const CommonActionMenu = () => {
  const player = usePlayer()
  const actions = useGameActions()
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
    () => getSecondaryActions(actions, player.isAdmin),
    [actions, player.isAdmin]
  )

  const primaryAction = useMemo(
    () => getPrimaryAction(actions, player.actions),
    [actions, player.actions]
  )

  return (
    <GameActionMenu
      primaryAction={primaryAction}
      settingsMenu={settingsMenu}
      secondaryActions={secondaryActions}
    />
  )
}
