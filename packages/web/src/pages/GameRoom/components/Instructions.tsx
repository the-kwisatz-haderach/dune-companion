import { ReactElement } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import { useGameDispatch, usePlayer } from '../../../dune-react'
import { Box, createStyles, Fab, makeStyles, Zoom } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    floatingButton: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
)

export default function Instructions(): ReactElement {
  const classes = useStyles()
  const dispatch = useGameDispatch()
  const player = usePlayer()

  const isPlayerReady = !player.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isPlayerReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  return (
    <Box>
      <Zoom in={player.faction !== null}>
        <Fab
          onClick={onToggleReady}
          variant="extended"
          size="large"
          color={isPlayerReady ? 'default' : 'primary'}
          aria-label="ready"
          className={classes.floatingButton}
        >
          {isPlayerReady ? (
            <BlockIcon className={classes.extendedIcon} />
          ) : (
            <CheckIcon className={classes.extendedIcon} />
          )}
          {isPlayerReady ? 'Not ready' : 'Ready'}
        </Fab>
      </Zoom>
    </Box>
  )
}
