import {
  Box,
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Button
} from '@material-ui/core'
import { Flex } from '../../../components/Flex'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { NumberInputGrid } from '../../../components/NumberInputGrid'
import { useGame, useGameDispatch, usePlayer } from '../../../dune-react'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 50,
      width: '100vw',
      height: 'calc(100vh - 100px)',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    grid: {
      padding: theme.spacing(3),
      height: '100%'
    }
  })
)

export const Auction = () => {
  const [countdown, setCountdown] = useState(-1)
  const classes = useStyles()
  const game = useGame()
  const player = usePlayer()
  const auction = game.auctions[game.currentTurn - 1]
  const dispatch = useGameDispatch()

  if (auction.isDone) {
    // something
  }

  const isPlayerTurn =
    auction.participants[auction.currentBidderIndex].id === player.id
  const currentRound = useMemo(() => auction.rounds.slice(-1)[0], [auction])

  const onBid = useCallback(
    (value: number) => {
      dispatch('PLACE_BID', {
        bid:
          (currentRound.bids[currentRound.bids.length - 1]?.amount || 0) + value
      })
    },
    [currentRound.bids, dispatch]
  )

  const onSkip = useCallback(() => {
    dispatch('SKIP_BID', {})
  }, [dispatch])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (!auction.isDone && isPlayerTurn && auction.lastActionTimestamp) {
      interval = setInterval(() => {
        const timeSinceLastAction =
          // 11 -
          41 -
          Math.floor(
            Math.abs(Date.now() - Date.parse(auction.lastActionTimestamp)) /
              1000
          )
        if (timeSinceLastAction >= 0) {
          setCountdown(timeSinceLastAction)
        } else {
          clearInterval(interval)
          //onSkip()
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [auction.isDone, auction.lastActionTimestamp, isPlayerTurn, onSkip])

  return (
    <Box className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={6}>
          <Typography variant="h5">Participants</Typography>
          <Flex>
            {auction.participants
              .filter(
                (participant) => !currentRound.skipped.includes(participant.id)
              )
              .map((player) => (
                <Typography>{game.players[player.id].name}</Typography>
              ))}
          </Flex>
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
          <Flex flexWrap="wrap">
            {currentRound.bids.map((bid) => (
              <Box>
                <Typography>
                  Bidder: {game.players[bid.playerId].name}
                </Typography>
                <Typography>Amount: {bid.amount}</Typography>
              </Box>
            ))}
          </Flex>
        </Grid>
      </Grid>
      <Flex p={3} spacing={2} flexDirection="column">
        <Flex spacing={2}>
          <Flex
            flex={1}
            alignItems="center"
            justifyContent="center"
            border="1px solid grey"
            flexDirection="column"
            p={2}
          >
            <Typography variant="caption">Highest bid</Typography>
            <Typography
              style={{
                fontSize: 36
              }}
            >
              {currentRound.bids[currentRound.bids.length - 1]?.amount || 0}
            </Typography>
          </Flex>
          <Flex
            flex={1}
            alignItems="center"
            justifyContent="center"
            border="1px solid grey"
            flexDirection="column"
            p={2}
          >
            <Typography variant="caption">You have</Typography>
            <Typography
              style={{
                fontSize: 36
              }}
            >
              {player.spice}
            </Typography>
          </Flex>
        </Flex>
        <Box>{countdown}</Box>
        <Typography variant="caption">Skip</Typography>
        <Button
          disabled={!isPlayerTurn}
          onClick={onSkip}
          fullWidth
          variant="outlined"
          color="primary"
        >
          Skip
        </Button>
        <Typography variant="caption">Raise the bid by</Typography>
        <NumberInputGrid
          onChange={onBid}
          max={Math.max(
            player.spice -
              (currentRound.bids[currentRound.bids.length - 1]?.amount || 0),
            0
          )}
          disabled={!isPlayerTurn}
        />
      </Flex>
    </Box>
  )
}
