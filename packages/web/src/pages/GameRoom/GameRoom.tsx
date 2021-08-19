import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useCallback, ReactElement, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import useUserContext from '../../contexts/UserContext'
import useWebsocketContext from '../../contexts/WebsocketContext'
import PlayerSetup from './components/PlayerSetup'
import { Factions, Game } from '@dune-companion/engine'
import CharacterSelect from './components/CharacterSelect'

export default function GameRoom(): ReactElement {
  const [isReady, setIsReady] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { username } = useUserContext()
  const { isConnected, dispatchAction, getClientId } = useWebsocketContext()
  const player = useSelector((state: Game) => state.players[getClientId()])
  const requiredActions = useSelector((state: Game) => state.requiredActions)
  const playersTable = useSelector((state: Game) => state.players)

  const updateName = useCallback(
    (name: string) => {
      dispatchAction('UPDATE_PLAYER_NAME', {
        name
      })
    },
    [dispatchAction]
  )

  const onSelectFaction = useCallback(
    (faction: Factions | null) => {
      dispatchAction('SELECT_FACTION', {
        faction
      })
    },
    [dispatchAction]
  )

  const onToggleReady = useCallback(() => {
    setIsReady(curr => !curr)
    if (isReady) {
      return dispatchAction('SET_IS_NOT_READY', {})
    }
    dispatchAction('SET_IS_READY', {})
  }, [dispatchAction, isReady])

  if (!isConnected()) {
    return <Redirect to="/" />
  }

  if (player.name === '') {
    return <PlayerSetup updateName={updateName} defaultName={username} />
  }

  const players = Object.values(playersTable)

  if (requiredActions.length !== 0) {
    return (
      <CharacterSelect
        isReady={isReady}
        onToggleReady={onToggleReady}
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
