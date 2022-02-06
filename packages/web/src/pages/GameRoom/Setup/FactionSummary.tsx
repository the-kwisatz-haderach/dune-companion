import { cities, Faction } from '@dune-companion/engine'
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { Icon } from '../../../components/Icon'
import { Showcase } from '../../../components/Showcase'

type Props = {
  faction: Faction
}

export const FactionSummary = ({ faction }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Test1</TableCell>
            <TableCell>Test2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    // <Grid container spacing={2} justifyContent="space-between">
    //   <Grid item xs={6}>
    //     <Showcase
    //       title="Free revivals"
    //       body={faction.freeRevivals.toString()}
    //       Icon={<Icon icon="revival" />}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <Showcase
    //       title="Starting spice"
    //       body={faction.startingSpice.toString()}
    //       Icon={<Icon icon="spice" />}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <Showcase
    //       title="Starting items"
    //       body={faction.startingItems.toString()}
    //       Icon={<Icon icon="treachery-card" />}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <Showcase
    //       title="Starting forces"
    //       body={`${faction.startingPlanetaryForces} + ${faction.startingReserveForces}`}
    //       Icon={<Icon icon="force" />}
    //     />
    //   </Grid>
    //   {faction.startingCity && (
    //     <Grid item xs={12}>
    //       <Showcase
    //         title="Starting city"
    //         body={cities[faction.startingCity].name}
    //         Icon={<Icon icon="city" />}
    //       />
    //     </Grid>
    //   )}
    // </Grid>
  )
}
