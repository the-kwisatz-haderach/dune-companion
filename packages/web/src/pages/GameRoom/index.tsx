import { ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import { useGame, useGameDispatch, usePlayer } from '../../dune-react'
import CommonPhases from './Common/CommonPhases'
import { createPendingActionsChecker } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import PlayerSetupPrompt from './Prompts/PlayerSetupPrompt'
import {
  commonRuleSet,
  factionRuleSets,
  Factions
} from '@dune-companion/engine'
import { Loading } from '../Loading'
import { withTransition } from '../../hocs/withTransition'

const CommonPhaseWithTransition = withTransition(CommonPhases, ({ phase }) => (
  <Loading phase={phase} />
))

const SetupPhaseWithTransition = withTransition(CommonPhases, ({ phase }) => (
  <Loading phase={phase} />
))

function GamePhase(): ReactElement {
  const game = useGame()
  const player = usePlayer()
  const dispatch = useGameDispatch()
  const isPending = createPendingActionsChecker(game)

  const phaseRules = Object.values(game.players)
    .map(player => player.faction)
    .filter((faction): faction is Factions => faction !== null)
    .flatMap(faction => factionRuleSets[faction][game.currentPhase])

  const rules = [
    ...commonRuleSet[game.currentPhase].filter(
      rule => !game.conditions.advancedMode || rule.isAdvanced
    ),
    ...phaseRules
  ].filter(rule => !rule.inclusionCondition || rule.inclusionCondition(game))

  const isReady = !player?.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  switch (game.currentPhase) {
    case 'SETUP':
      if (isPending('SELECT_FACTION').forAnyPlayer()) {
        return (
          <>
            <PlayerSetupPrompt />
            <FactionSelect />
          </>
        )
      }
      return (
        <SetupPhaseWithTransition
          phase={game.currentPhase}
          rules={rules}
          isReady={isReady}
          onToggleReady={onToggleReady}
          trigger={game.currentPhase}
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
          isReady={isReady}
          onToggleReady={onToggleReady}
          trigger={game.currentPhase}
        />
      )
    case 'FINISHED':
      return <p>FINISHED!</p>
    default:
      return <Redirect to="/" />
  }
}

export default GamePhase
