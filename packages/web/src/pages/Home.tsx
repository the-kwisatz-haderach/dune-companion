import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import { useEffect } from 'react'
import { ReactElement, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGameConnection, useGameDispatch } from '../dune-react'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.grey[100],
      padding: 15
    },
    link: {
      height: '100%',
      width: '100%',
      textDecoration: 'none',
      '&:first-child': {
        marginBottom: 15
      }
    },
    playContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

export default function Home(): ReactElement {
  const classes = useStyles()
  const { connect } = useGameConnection()
  const dispatch = useGameDispatch()
  const [roomId, setRoomId] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    connect()
  }, [connect])

  const handleJoinGame = async (e: FormEvent) => {
    e.preventDefault()
    await dispatch('JOIN_GAME', {
      roomId,
      password
    })
  }

  return (
    <Container className={classes.container}>
      <Box height="50%" p={1}>
        <Link className={classes.link} to="/game">
          <Paper elevation={8} className={classes.playContainer}>
            <Typography variant="h5">Create Game</Typography>
          </Paper>
        </Link>
      </Box>
      <Box height="50%" p={1}>
        <Typography variant="h5">Join Game</Typography>
        <form onSubmit={handleJoinGame}>
          <TextField
            label="Room ID"
            fullWidth
            value={roomId}
            required
            onChange={e => setRoomId(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Connect
          </Button>
        </form>
      </Box>
    </Container>
  )
}
