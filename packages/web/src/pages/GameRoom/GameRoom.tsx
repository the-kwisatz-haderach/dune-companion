import { Box, Button, TextField, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import useUserContext from '../../contexts/UserContext'
import useWebsocketContext from '../../contexts/WebsocketContext'

export default function GameRoom(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const { username } = useUserContext()
  const [name, setName] = useState(username)
  const { sendMessage } = useWebsocketContext()

  const updateName = useCallback(
    (name: string) => {
      sendMessage('UPDATE_PLAYER_NAME', {
        name
      })
    },
    [sendMessage]
  )

  useEffect(() => {
    if (username) {
      updateName(username)
    }
  }, [username, sendMessage, updateName])

  return (
    <Box p={1}>
      <Typography>Room {id}</Typography>
      <Box display="flex">
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateName(name)}
        >
          Update
        </Button>
      </Box>
      <Box></Box>
    </Box>
  )
}
