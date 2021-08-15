import {
  Button,
  Container,
  createStyles,
  InputLabel,
  makeStyles,
  Switch,
  TextField,
  Typography
} from '@material-ui/core'
import { FormEvent, ReactElement, useState } from 'react'
import useWebsocketContext from '../../contexts/WebsocketContext'

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
      height: '100%',
      display: 'flex',
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

export default function CreateGame(): ReactElement {
  const classes = useStyles()
  const { connect, sendMessage } = useWebsocketContext()
  const [roomId, setRoomId] = useState('')
  const [password, setPassword] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(4)
  const [maxTurns, setMaxTurns] = useState(10)
  const [advancedMode, setAdvancedMode] = useState(false)

  const handleCreateGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await connect()
    await sendMessage('CREATE_GAME', {
      roomId,
      password,
      conditions: {
        advancedMode,
        maxPlayers,
        maxTurns
      }
    })
  }

  return (
    <Container className={classes.container}>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Game
        </Button>
      </form>
    </Container>
  )
}
