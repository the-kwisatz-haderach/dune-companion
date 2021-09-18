import { ReactElement, useMemo } from 'react'
import { useGame, usePlayer } from '../../dune-react'
import CommonPhases from './Common'
import { createRuleFilter } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import { Loading } from '../Loading'
import useGameSettingsContext from '../../contexts/GameSettingsContext/GameSettingsContext'
import { Factions } from '@dune-companion/engine'
import { Box, Fade } from '@material-ui/core'
import { useDelayedState } from '../../hooks/useDelayedState'
import { useTransition } from '../../hooks/useTransition'

function GamePhase(): ReactElement {
  const { showAllFactionRules } = useGameSettingsContext()
  const game = useGame()
  const player = usePlayer()
  const transition = useTransition(game.currentPhase, {
    duration: 3500,
    delay: 500
  })
  const delayedCurrentPhase = useDelayedState(game.currentPhase, 3500)

  const ruleFilter = useMemo(
    () =>
      createRuleFilter({
        currentPhase: game.currentPhase,
        currentTurn: game.currentTurn,
        advancedMode: game.conditions.advancedMode,
        playerFaction: player.faction,
        showAllFactions: showAllFactionRules
      }),
    [
      game.currentPhase,
      game.currentTurn,
      game.conditions.advancedMode,
      player.faction,
      showAllFactionRules
    ]
  )

  const playerFactions = useMemo(
    () =>
      Object.values(game.players)
        .map(player => player.faction)
        .filter((faction): faction is Factions => faction !== null),
    [game.players]
  )

  if (game.currentPhase === 'FACTION_SELECT') {
    return <FactionSelect />
  }

  return (
    <>
      <Fade in={!transition} timeout={1000}>
        <Box position="relative">
          <CommonPhases
            ruleFilter={ruleFilter}
            phase={delayedCurrentPhase}
            playerFactions={playerFactions}
          />
        </Box>
      </Fade>
      <Fade in={transition} timeout={1000} unmountOnExit>
        <Box position="relative" zIndex={10000}>
          <Loading phase={game.currentPhase} />
        </Box>
      </Fade>
    </>
  )
}

export default GamePhase
