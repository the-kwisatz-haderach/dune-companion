import { cities, Faction, Factions } from '@dune-companion/engine'
import {
  makeStyles,
  createStyles,
  Typography,
  Theme,
  Grid,
  Box
} from '@material-ui/core'
import { Icon } from '../../../components/Icon'

type Props = {
  faction: Faction
  factionKey: Factions
}

const useStyles = makeStyles<Theme, Pick<Props, 'factionKey'>>((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.grey[200]}`
      }
    },
    title: {},
    img: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      padding: 4,
      backgroundImage: ({ factionKey }) =>
        `linear-gradient(175deg, ${theme.palette[factionKey].main}, ${theme.palette[factionKey].dark})`
    },
    strength: {
      fontWeight: 'bold',
      fontSize: 14
    }
  })
)

export const FactionSummary = ({ faction, factionKey }: Props) => {
  const classes = useStyles({ factionKey })
  return (
    <Box px={1}>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={2} alignItems="center">
          <Icon icon="revival" />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.title}>
            Free revivals
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.strength}>
            {faction.freeRevivals.toString()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={2} alignItems="center">
          <Icon icon="spice" />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.title}>
            Starting spice
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.strength}>
            {faction.startingSpice.toString()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={2} alignItems="center">
          <Icon icon="treachery-card" />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.title}>
            Starting items
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.strength}>
            {faction.startingItems.toString()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={2} alignItems="center">
          <Icon icon="force" />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.title}>
            Starting planetary forces
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.strength}>
            {faction.startingPlanetaryForces.toString()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={2} alignItems="center">
          <Icon icon="force" />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.title}>
            Starting reserve forces
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.strength}>
            {faction.startingReserveForces.toString()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={2} alignItems="center">
          <Icon icon="city" />
        </Grid>
        <Grid item xs>
          <Typography variant="body2" className={classes.title}>
            Starting city
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.strength}>
            {faction.startingCity ? cities[faction.startingCity].name : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
