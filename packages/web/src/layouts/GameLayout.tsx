import React, { useEffect } from 'react'
import { Box, makeStyles, createStyles, Slide } from '@material-ui/core'
import { useGame, useGameConnection } from '../dune-react'
import { ConditionsMenu } from '../components/ConditionsMenu'
import { useTransition } from '../hooks/useTransition'

const useStyles = makeStyles((theme) =>
  createStyles({
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
  const { connect } = useGameConnection()
  const classes = useStyles()
  const game = useGame()
  const transition = useTransition(game.currentPhase, { duration: 3500 })

  useEffect(() => {
    connect()
  }, [connect])

  return (
    <Box position="relative">
      {game.currentTurn > 0 && (
        <Slide direction="down" in={!transition}>
          <div className={classes.conditionsMenu}>
            <ConditionsMenu
              maxTurns={game.maxTurns}
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
    </Box>
  )
}
