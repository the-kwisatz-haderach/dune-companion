import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  InputLabel,
  makeStyles,
  Switch,
  TextField,
  Typography
} from '@material-ui/core'
import { FormEvent, ReactElement, useEffect, useState } from 'react'
import { useGameConnection, useGameDispatch } from '../../dune-react'

const useStyles = makeStyles(theme =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      '& > *:not(:last-child)': {
        marginBottom: '1.5rem'
      }
    },
    formField: {
      width: '100%'
    },
    icon: {
      border: `3px solid ${theme.palette.success.main}`,
      marginBottom: 10,
      borderRadius: '50%',
      color: 'white',
      padding: 10,
      backgroundColor: theme.palette.success.light
    },
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      padding: '1rem'
    },
    step: {
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute'
    },
    title: {
      marginBottom: '1rem'
    }
  })
)

export default function StartGame(): ReactElement {
  const classes = useStyles()
  const { connect } = useGameConnection()
  const dispatch = useGameDispatch()
  const [roomId, setRoomId] = useState('')
  const [password, setPassword] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(4)
  const [maxTurns, setMaxTurns] = useState(10)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [joinRoomId, setJoinRoomId] = useState('')
  const [joinPassword, setJoinPassword] = useState('')

  useEffect(() => {
    connect()
  }, [connect])

  const handleCreateGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch('CREATE_GAME', {
      roomId,
      password,
      conditions: {
        advancedMode,
        maxPlayers,
        maxTurns
      }
    })
  }

  const handleJoinGame = async (e: FormEvent) => {
    e.preventDefault()
    await dispatch('JOIN_GAME', {
      roomId,
      password
    })
  }

  return (
    <Container className={classes.container}>
      <Box>
        <Typography variant="h5" className={classes.title}>
          Create Game
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleCreateGame}
          autoComplete="off"
        >
          <TextField
            className={classes.formField}
            value={roomId}
            onChange={e => {
              setRoomId(e.target.value)
            }}
            required
            label="Room ID"
          />
          <TextField
            className={classes.formField}
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
            label="Password"
          />
          <TextField
            InputProps={{
              endAdornment: 'Players',
              inputProps: { max: 6, min: 2 }
            }}
            type="number"
            value={maxPlayers}
            onChange={e =>
              setMaxPlayers(Number.parseInt(e.target.value || '0', 10))
            }
            label="Max players"
          />
          <TextField
            InputProps={{
              endAdornment: 'Turns',
              inputProps: { max: 10, min: 5 }
            }}
            type="number"
            value={maxTurns}
            onChange={e =>
              setMaxTurns(Number.parseInt(e.target.value || '0', 10))
            }
            label="Max turns"
          />
          <InputLabel>
            Advanced Mode
            <Switch
              checked={advancedMode}
              onChange={e => setAdvancedMode(e.target.checked)}
            />
          </InputLabel>
          <Button type="submit" variant="contained" color="primary">
            Create Game
          </Button>
        </form>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h5">Join Game</Typography>
        <form onSubmit={handleJoinGame}>
          <TextField
            label="Room ID"
            fullWidth
            value={joinRoomId}
            required
            onChange={e => setJoinRoomId(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            value={joinPassword}
            onChange={e => setJoinPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Connect
          </Button>
        </form>
      </Box>
    </Container>
  )
}
