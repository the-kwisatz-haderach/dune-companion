import { ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import { useGame } from '../../dune-react'
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
import { Transition } from './Transition'

function GamePhase(): ReactElement {
  const game = useGame()
  const isPending = createPendingActionsChecker(game)

  if (game.currentTurn === 0 && isPending('SELECT_FACTION').forAnyPlayer()) {
    return (
      <>
        <PlayerSetupPrompt />
        <FactionSelect />
      </>
    )
  }

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

  switch (game.currentPhase) {
    case 'SETUP':
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
        <Transition
          Component={CommonPhases}
          componentProps={{ phase: game.currentPhase, rules }}
          trigger={game.currentPhase}
          Loader={({ phase }) => <Loading nextPhase={phase} />}
        />
      )
    case 'FINISHED':
      return <p>FINISHED!</p>
    default:
      return <Redirect to="/" />
  }
}

export default GamePhase
