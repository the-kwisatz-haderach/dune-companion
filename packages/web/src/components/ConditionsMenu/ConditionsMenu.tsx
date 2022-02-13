import { Phases, phases } from '@dune-companion/engine'
import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      backgroundImage:
        'linear-gradient(0deg, hsl(219, 40%, 30%), hsl(219deg 36% 60%))',
      boxShadow: '0px 5px 20px -2px rgb(0 0 0 / 10%)',
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    },
    item: {
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontWeight: 400,
      color: theme.palette.primary.contrastText,
      fontSize: theme.typography.pxToRem(9),
      textTransform: 'uppercase'
    },
    text: {
      color: theme.palette.primary.contrastText,
      fontSize: theme.typography.pxToRem(12),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontWeight: 500
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
    <Grid container className={classes.root} wrap="nowrap">
      <Grid item xs={3} className={classes.item}>
        <Typography className={classes.title} variant="caption">
          Turn
        </Typography>
        <Typography variant="body2" className={classes.text}>
          {currentTurn} / {maxTurns}
        </Typography>
      </Grid>
      <Grid item xs className={classes.item}>
        <Typography className={classes.title} variant="caption">
          First player
        </Typography>
        <Typography variant="body2" className={classes.text}>
          {currentFirstPlayer}
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.item}>
        <Typography className={classes.title} variant="caption">
          Phase
        </Typography>
        <Typography variant="body2" className={classes.text}>
          {phases[currentPhase].name}
        </Typography>
      </Grid>
    </Grid>
  )
}
