import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useCallback, ReactElement } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import useUserContext from '../../contexts/UserContext'
import useWebsocketContext from '../../contexts/WebsocketContext'
import PlayerSetup from './components/PlayerSetup'
import { Factions, Game } from '@dune-companion/engine'
import CharacterSelect from './components/CharacterSelect'

export default function GameRoom(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const { username } = useUserContext()
  const { isConnected, sendMessage, getClientId } = useWebsocketContext()
  const player = useSelector((state: Game) => state.players[getClientId()])
  const playersTable = useSelector((state: Game) => state.players)

  const updateName = useCallback(
    (name: string) => {
      sendMessage('UPDATE_PLAYER_NAME', {
        name
      })
    },
    [sendMessage]
  )

  const onSelectFaction = useCallback(
    (faction: Factions | null) => {
      sendMessage('SELECT_FACTION', {
        faction
      })
    },
    [sendMessage]
  )

  if (!isConnected()) {
    return <Redirect to="/" />
  }

  if (player.name === '') {
    return <PlayerSetup updateName={updateName} defaultName={username} />
  }

  const players = Object.values(playersTable)
  if (players.some(player => !player.isReady)) {
    return (
      <CharacterSelect
        playerSelection={player.faction}
        onSelectFaction={onSelectFaction}
        selectedFactions={
          players.map(player => player.faction).filter(Boolean) as Factions[]
        }
      />
    )
  }

  return (
    <Box p={1}>
      <Typography>Room {id}</Typography>
    </Box>
  )
}
