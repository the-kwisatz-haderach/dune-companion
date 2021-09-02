import { ReactElement, useLayoutEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useGame } from '../../dune-react'
import CommonPhases from './Common/CommonPhases'
import { createPendingActionsChecker } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import PlayerSetupPrompt from './Prompts/PlayerSetupPrompt'
import {
  commonRuleSet,
  factionRuleSets,
  Factions,
  Phases
} from '@dune-companion/engine'
import { Box, Fade } from '@material-ui/core'
import { Loading } from '../Loading'
import { useRef } from 'react'

type Props = {
  currentPhase: Phases
}

function GameRoom({ currentPhase }: Props): ReactElement {
  const game = useGame()

  const isPending = createPendingActionsChecker(game)

  if (isPending('SELECT_FACTION').forAnyPlayer()) {
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
    .flatMap(faction => factionRuleSets[faction][currentPhase])

  const rules = [
    ...commonRuleSet[currentPhase].filter(
      rule => !game.conditions.advancedMode || rule.isAdvanced
    ),
    ...phaseRules
  ].filter(rule => !rule.inclusionCondition || rule.inclusionCondition(game))

  switch (currentPhase) {
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
      return <CommonPhases rules={rules} phase={currentPhase} />
    case 'FINISHED':
      return <p>FINISHED!</p>
    default:
      return <Redirect to="/" />
  }
}

const Game = () => {
  const game = useGame()
  const previousPhase = useRef(game.currentPhase)
  const [transition, setTransition] = useState(false)

  useLayoutEffect(() => {
    setTransition(true)
    const timer = setTimeout(() => {
      previousPhase.current = game.currentPhase
      setTransition(false)
    }, 3500)
    return () => {
      clearTimeout(timer)
    }
  }, [game.currentPhase])

  return (
    <>
      <Fade in={!transition}>
        <GameRoom
          currentPhase={transition ? previousPhase.current : game.currentPhase}
        />
      </Fade>
      <Fade in={transition} timeout={1000} unmountOnExit>
        <Box position="relative" zIndex={1000}>
          <Loading nextPhase={game.currentPhase} />
        </Box>
      </Fade>
    </>
  )
}

export default Game
