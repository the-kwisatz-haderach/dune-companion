import { Phases, phases } from '@dune-companion/engine'
import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      zIndex: 500,
      position: 'sticky',
      top: 0,
      display: 'flex',
      width: '100%',
      backgroundColor: theme.palette.common.white,
      boxShadow: '0px 5px 20px -2px rgb(0 0 0 / 20%)'
    },
    item: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      display: 'flex',
      flexDirection: 'column',
      '& p': {
        lineHeight: 1.4
      }
    },
    title: {
      fontSize: theme.typography.pxToRem(10),
      textTransform: 'uppercase'
    }
  })
)

type Props = {
  currentTurn: number
  maxTurns: number
  currentPhase: Phases
  currentFirstPlayer: string
}

export const ConditionsMenu: React.FC<Props> = ({
  currentFirstPlayer,
  currentPhase,
  currentTurn,
  maxTurns
}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={3} className={classes.item}>
        <Typography className={classes.title} variant="body1">
          Turn
        </Typography>
        <Typography variant="body1">
          <strong>
            {currentTurn} / {maxTurns}
          </strong>
        </Typography>
      </Grid>
      <Grid item xs className={classes.item}>
        <Typography className={classes.title} variant="body1">
          Phase
        </Typography>
        <Typography variant="body1">
          <strong>{phases[currentPhase].name}</strong>
        </Typography>
      </Grid>
      <Grid item xs className={classes.item}>
        <Typography className={classes.title} variant="body1">
          First player
        </Typography>
        <Typography variant="body1">
          <strong>{currentFirstPlayer}</strong>
        </Typography>
      </Grid>
    </Grid>
  )
}
