import React from 'react'
import { Box, makeStyles, createStyles, Slide } from '@material-ui/core'
import { useGame } from '../dune-react'
import { ConditionsMenu } from '../components/ConditionsMenu'
import { CommonActionMenu } from '../pages/GameRoom/Common/CommonActionMenu'
import { useTransition } from '../hooks/useTransition'

const useStyles = makeStyles(theme =>
  createStyles({
    actionsMenu: {
      position: 'fixed',
      width: '100%',
      zIndex: 500,
      bottom: theme.spacing(1)
    },
    conditionsMenu: {
      zIndex: 500,
      position: 'fixed',
      top: 0,
      width: '100%',
      marginBottom: theme.spacing(3)
    }
  })
)

export const GameLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  const game = useGame()
  const transition = useTransition(game.currentPhase, { duration: 4500 })
  return (
    <Box position="relative">
      {game.currentTurn > 0 && (
        <Slide direction="down" in={!transition}>
          <div className={classes.conditionsMenu}>
            <ConditionsMenu
              maxTurns={game.conditions.maxTurns}
              currentFirstPlayer={
                game.currentFirstPlayer !== null
                  ? game.players[game.playerOrder[game.currentFirstPlayer]].name
                  : 'TBD'
              }
              currentPhase={game.currentPhase}
              currentTurn={game.currentTurn}
            />
          </div>
        </Slide>
      )}
      {children}
      {game.currentPhase !== 'FACTION_SELECT' && (
        <div className={classes.actionsMenu}>
          <Slide direction="up" in={!transition}>
            <div>
              <CommonActionMenu />
            </div>
          </Slide>
        </div>
      )}
    </Box>
  )
}
