import { ReactElement, useMemo, useState } from 'react'
import { useGame, usePlayer } from '../../dune-react'
import CommonPhases from './Common'
import { createRuleFilter } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import { Loading } from '../Loading'
import useGameSettingsContext from '../../contexts/GameSettingsContext/GameSettingsContext'
import { Factions } from '@dune-companion/engine'
import { Box, createStyles, Fade, makeStyles, Slide } from '@material-ui/core'
import { useDelayedState } from '../../hooks/useDelayedState'
import { useTransition } from '../../hooks/useTransition'
import { Auction } from './Auction'
import { CommonActionMenu } from './Common/CommonActionMenu'

const useStyles = makeStyles(() =>
  createStyles({
    actionsMenu: {
      position: 'fixed',
      width: '100%',
      zIndex: 500,
      bottom: 0
    }
  })
)

function GamePhase(): ReactElement {
  const classes = useStyles()
  const [menuValue, setMenuValue] = useState<
    'actions' | 'faq' | 'faction' | 'settings'
  >()
  const { showAllFactionRules } = useGameSettingsContext()
  const game = useGame()
  const player = usePlayer()
  const transition = useTransition(game.currentPhase, {
    duration: 3500,
    delay: 500,
    condition: game.currentPhase !== 'FACTION_SELECT'
  })
  const delayedCurrentPhase = useDelayedState(game.currentPhase, 3500)

  const ruleFilter = useMemo(
    () =>
      createRuleFilter({
        currentPhase: game.currentPhase,
        currentTurn: game.currentTurn,
        advancedMode: game.isAdvancedMode,
        playerFaction: player.faction,
        showAllFactions: showAllFactionRules
      }),
    [
      game.currentPhase,
      game.currentTurn,
      game.isAdvancedMode,
      player.faction,
      showAllFactionRules
    ]
  )

  const playerFactions = useMemo(
    () =>
      Object.values(game.players)
        .map((player) => player.faction)
        .filter((faction): faction is Factions => faction !== null),
    [game.players]
  )

  if (game.currentPhase === 'BIDDING') {
    const latestAuction = game.auctions[game.currentTurn - 1]
    if (latestAuction) {
      return <Auction auction={latestAuction} />
    }
  }

  return (
    <>
      <Fade in={!transition} timeout={1000} unmountOnExit>
        <Box position="relative">
          {delayedCurrentPhase === 'FACTION_SELECT' ? (
            <FactionSelect />
          ) : (
            <CommonPhases
              ruleFilter={ruleFilter}
              phase={delayedCurrentPhase}
              playerFactions={playerFactions}
            />
          )}
        </Box>
      </Fade>
      <Fade in={transition} timeout={1000} unmountOnExit>
        <Box position="relative" zIndex={10000}>
          <Loading phase={game.currentPhase} />
        </Box>
      </Fade>
      <div className={classes.actionsMenu}>
        <Slide direction="up" in={!transition}>
          <div>
            <CommonActionMenu value={menuValue} onChange={setMenuValue} />
          </div>
        </Slide>
      </div>
    </>
  )
}

export default GamePhase
