import React from 'react'
import { Box, createStyles, makeStyles } from '@material-ui/core'
import { ActionMenu } from '../components/ActionMenu'
import { useGame, useGameDispatch, usePlayer } from '../dune-react'
import { ConditionsMenu } from '../components/ConditionsMenu'

const useStyles = makeStyles(() =>
  createStyles({
    fixedBottom: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 500
    },
    fixedTop: {
      zIndex: 500,
      position: 'sticky',
      top: 0,
      width: '100%'
    }
  })
)

export const GameLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  const player = usePlayer()
  const game = useGame()
  const dispatch = useGameDispatch()

  const hasPlayerSelectedFaction = !player?.actions.some(
    action => action.type === 'SELECT_FACTION'
  )

  const isPlayerReady = !player?.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isPlayerReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  return (
    <Box position="relative">
      <Box className={classes.fixedTop}>
        <ConditionsMenu />
      </Box>
      {hasPlayerSelectedFaction && (
        <Box className={classes.fixedBottom}>
          <ActionMenu
            primaryActionLabel={isPlayerReady ? 'Not ready' : 'Ready'}
            primaryActionType={isPlayerReady ? 'negative' : 'positive'}
            onPrimaryAction={onToggleReady}
          />
        </Box>
      )}
      <Box>{children}</Box>
    </Box>
  )
}
