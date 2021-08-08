import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import { useState } from 'react'
import { FormEvent, ReactElement } from 'react'
import useWebsocketContext from '../contexts/WebsocketContext'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  })
)

export default function Home(): ReactElement {
  const classes = useStyles()
  const { connect, sendMessage } = useWebsocketContext()
  const [newRoomId, setNewRoomId] = useState('')
  const [roomId, setRoomId] = useState('')

  const handleCreateGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    connect(newRoomId)
  }

  const handleJoinGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    connect(roomId)
  }

  const submitAction = () => {
    sendMessage({
      type: 'SET_CONDITIONS',
      payload: {
        advancedMode: true,
        maxPlayers: 6,
        maxTurns: 3
      }
    })
  }

  return (
    <Container className={classes.container}>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Start Game</Typography>
        <form onSubmit={handleCreateGame} autoComplete="off">
          <TextField
            value={roomId}
            onChange={e => {
              setRoomId(e.target.value)
            }}
            label="Room ID"
          />
          <Button onClick={() => connect(roomId)}>Create Room</Button>
          <Button onClick={submitAction}>SET CONDITIONS</Button>
        </form>
      </Box>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Join Game</Typography>
        <form onSubmit={handleJoinGame} autoComplete="off">
          <TextField
            value={newRoomId}
            onChange={e => {
              setNewRoomId(e.target.value)
            }}
            label="Room ID"
          />
          <Button onClick={() => connect(newRoomId)}>Join Room</Button>
        </form>
      </Box>
    </Container>
  )
}
