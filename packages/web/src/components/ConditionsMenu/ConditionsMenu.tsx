import { phases } from '@dune-companion/engine'
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'
import { useGame } from '../../dune-react'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      backgroundColor: theme.palette.common.white,
      boxShadow: '0px 5px 20px -2px rgb(0 0 0 / 20%)',
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(4)
      }
    },
    item: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontSize: theme.typography.pxToRem(12),
      textTransform: 'uppercase'
    }
  })
)

export const ConditionsMenu: React.FC = () => {
  const classes = useStyles()
  const game = useGame()
  return (
    <Box className={classes.root}>
      <Box className={classes.item}>
        <Typography className={classes.title} variant="body1">
          Turn
        </Typography>
        <Typography variant="body1">
          <strong>
            {game.currentTurn} / {game.conditions.maxTurns}
          </strong>
        </Typography>
      </Box>
      <Box className={classes.item}>
        <Typography className={classes.title} variant="body1">
          Phase
        </Typography>
        <Typography variant="body1">
          <strong>{phases[game.currentPhase].name}</strong>
        </Typography>
      </Box>
      <Box className={classes.item}>
        <Typography className={classes.title} variant="body1">
          First player
        </Typography>
        <Typography variant="body1">
          <strong>Atreides</strong>
          {/* {game.players[game.playerOrder[game.currentFirstPlayer]].name} */}
        </Typography>
      </Box>
    </Box>
  )
}
