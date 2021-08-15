import { Box, Button, TextField, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { ReactElement } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import useUserContext from '../../contexts/UserContext'
import useWebsocketContext from '../../contexts/WebsocketContext'
import PlayerSetup from './components/PlayerSetup'

export default function GameRoom(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const { username } = useUserContext()
  const { isConnected, sendMessage } = useWebsocketContext()

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

  if (!isConnected()) {
    return <Redirect to="/" />
  }

  if ('' === '') {
    return <PlayerSetup updateName={updateName} defaultName={username} />
  }

  return (
    <Box p={1}>
      <Typography>Room {id}</Typography>
    </Box>
  )
}
