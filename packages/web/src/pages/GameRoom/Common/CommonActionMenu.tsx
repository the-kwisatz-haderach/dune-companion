import { useMemo } from 'react'
import { useGameActions, usePlayer } from '../../../dune-react'
import useGameSettingsContext from '../../../contexts/GameSettingsContext/GameSettingsContext'
import {
  GameActionMenu,
  GameActionMenuProps
} from '../../../components/GameActionMenu'

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

  const { primaryAction, secondaryActions } = useMemo(() => {
    const secondaryActions: GameActionMenuProps['secondaryActions'] = [
      {
        label: actions.SET_PLAYER_ORDER.label,
        onClick: actions.SET_PLAYER_ORDER.handler
      },
      {
        label: actions.SET_FIRST_PLAYER.label,
        onClick: actions.SET_FIRST_PLAYER.handler
      }
    ]
    const action =
      actions[
        player.actions.filter(action => action.isRequired)[0]
          ?.type as keyof typeof actions
      ]
    return {
      secondaryActions,
      primaryAction: action && {
        label: action.label,
        onClick: action.handler,
        style: action.style
      }
    }
  }, [actions, player.actions])

  return (
    <GameActionMenu
      primaryAction={primaryAction}
      settingsMenu={settingsMenu}
      secondaryActions={secondaryActions}
    />
  )
}
