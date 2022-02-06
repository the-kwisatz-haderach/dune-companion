import { cities, Faction, Factions } from '@dune-companion/engine'
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  createStyles,
  Typography,
  TableHead,
  Theme
} from '@material-ui/core'
import { Icon } from '../../../components/Icon'

type Props = {
  faction: Faction
  factionKey: Factions
}

const useStyles = makeStyles<Theme, Props>((theme) =>
  createStyles({
    headerRow: {
      backgroundColor: ({ factionKey }) => theme.palette[factionKey].dark,
      '& th': {
        color: ({ factionKey }) => theme.palette[factionKey].contrastText
      }
    },
    statistic: {
      display: 'inline-flex',
      '& > *:first-child': {
        marginRight: 8
      }
    }
  })
)

export const FactionSummary = ({ faction, factionKey }: Props) => {
  const classes = useStyles({ faction, factionKey })
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead className={classes.headerRow}>
          <TableRow>
            <TableCell width="60%">Asset</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell width="60%">
              <span className={classes.statistic}>
                <Icon icon="revival" size="medium" />
                <Typography variant="body2">Free revivals</Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {faction.freeRevivals.toString()}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width="60%">
              <span className={classes.statistic}>
                <Icon icon="spice" size="medium" />
                <Typography variant="body2">Starting spice</Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {faction.startingSpice.toString()}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width="60%">
              <span className={classes.statistic}>
                <Icon icon="treachery-card" size="medium" />
                <Typography variant="body2">Starting items</Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {faction.startingItems.toString()}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width="60%">
              <span className={classes.statistic}>
                <Icon icon="force" size="medium" />
                <Typography variant="body2">
                  Starting planetary forces
                </Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {faction.startingPlanetaryForces.toString()}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width="75%">
              <span className={classes.statistic}>
                <Icon icon="force" size="medium" />
                <Typography variant="body2">Starting reserve forces</Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {faction.startingReserveForces.toString()}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width="50%">
              <span className={classes.statistic}>
                <Icon icon="city" size="medium" />
                <Typography variant="body2">Starting city</Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {faction.startingCity
                  ? cities[faction.startingCity].name
                  : 'None'}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
