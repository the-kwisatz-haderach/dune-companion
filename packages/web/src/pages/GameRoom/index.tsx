import React, { ReactElement, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useGame, usePlayer, useGameActions } from '../../dune-react'
import CommonPhases from './Common'
import { createPendingActionsChecker } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import {
  commonRuleSets,
  factionRuleSets,
  Factions,
  RuleSection
} from '@dune-companion/engine'
import { Loading } from '../Loading'
import { withTransition } from '../../hocs/withTransition'
import { ActionMenu } from '../../components/ActionMenu'

const CommonPhaseWithTransition = withTransition(CommonPhases, ({ phase }) => (
  <Loading phase={phase} />
))

const CommonActionMenu: React.FC = () => {
  const player = usePlayer()
  const actions = useGameActions()
  const requiredAction = player.actions.find(action => action.isRequired)
  if (!requiredAction) return <></>
  return (
    <ActionMenu
      primaryActionLabel={actions[requiredAction.type]?.label}
      primaryActionType={actions[requiredAction.type]?.style}
      onPrimaryAction={actions[requiredAction.type]?.handler}
    />
  )
}

function GamePhase(): ReactElement {
  const game = useGame()
  const isPending = useMemo(() => createPendingActionsChecker(game.players), [
    game.players
  ])

  const factionRules = Object.values(game.players)
    .map(player => player.faction)
    .filter((faction): faction is Factions => faction !== null)
    .flatMap(faction => factionRuleSets[faction][game.currentPhase])
    .filter(rule => !rule?.inclusionCondition || rule?.inclusionCondition(game))
    .filter(
      rule =>
        !rule.isAdvanced || (game.conditions.advancedMode && rule.isAdvanced)
    )

  const rules: RuleSection[] = [
    ...commonRuleSets[game.currentPhase]?.map(section => ({
      ...section,
      rules: section?.rules?.filter(
        rule =>
          !rule.isAdvanced || (game.conditions.advancedMode && rule.isAdvanced)
      )
    })),
    {
      title: 'Faction Rules',
      rules: factionRules
    }
  ]

  switch (game.currentPhase) {
    case 'SETUP':
      if (isPending('SELECT_FACTION').forAnyPlayer()) {
        return <FactionSelect />
      }
      return (
        <CommonPhaseWithTransition
          phase={game.currentPhase}
          rules={rules}
          trigger={game.currentPhase}
          ActionMenu={CommonActionMenu}
        />
      )
    case 'STORM':
    case 'SPICE_BLOW_AND_NEXUS':
    case 'CHOAM_CHARITY':
    case 'BIDDING':
    case 'REVIVAL':
    case 'SHIPMENT_AND_MOVEMENT':
    case 'BATTLE':
    case 'SPICE_HARVEST':
    case 'MENTAT_PAUSE':
      return (
        <CommonPhaseWithTransition
          phase={game.currentPhase}
          rules={rules}
          trigger={game.currentPhase}
          ActionMenu={CommonActionMenu}
        />
      )
    case 'FINISHED':
      return <p>FINISHED!</p>
    default:
      return <Redirect to="/" />
  }
}

export default GamePhase
