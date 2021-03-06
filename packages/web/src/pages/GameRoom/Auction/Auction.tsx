import {
  Box,
  makeStyles,
  createStyles,
  Grid,
  Typography
} from '@material-ui/core'
import { useMemo } from 'react'
import { useGame, useGameDispatch } from '../../../dune-react'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 50,
      backgroundColor: theme.palette.primary.main,
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    grid: {
      padding: theme.spacing(3),
      height: '100%'
    }
  })
)

export const Auction = () => {
  const classes = useStyles()
  const game = useGame()
  const auction = game.auctions[game.currentTurn - 1]
  const dispatch = useGameDispatch()

  if (auction.isDone) {
    // something
  }

  const currentRound = useMemo(() => auction.rounds.slice(-1)[0], [auction])

  return (
    <Box className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={6}>
          <Typography variant="h5">Bidding</Typography>
          {auction.participants
            .filter(
              (participant) => !currentRound.skipped.includes(participant.id)
            )
            .map((player) => (
              <Typography>{game.players[player.id].name}</Typography>
            ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Skipped</Typography>
          {currentRound.skipped.map((playerId) => (
            <Typography>{game.players[playerId].name}</Typography>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Current Bidder</Typography>
          <Typography>
            {
              game.players[auction.participants[auction.currentBidderIndex].id]
                .name
            }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Bids</Typography>
          <Typography>
            {currentRound.bids.map((bid) => (
              <Box>
                <Typography>
                  Bidder: {game.players[bid.playerId].name}
                </Typography>
                <Typography>Amount: {bid.amount}</Typography>
              </Box>
            ))}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
