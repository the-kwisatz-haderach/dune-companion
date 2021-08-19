import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useCallback, ReactElement, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUserContext from '../../contexts/UserContext'
import { usePlayer, useGameDispatch } from '../../dune-react'
import PlayerSetup from './components/PlayerSetup'
import { Factions, Game } from '@dune-companion/engine'
import CharacterSelect from './components/CharacterSelect'

export default function GameRoom(): ReactElement {
  const [isReady, setIsReady] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { username } = useUserContext()
  const dispatch = useGameDispatch()
  const player = usePlayer()
  const requiredActions = useSelector((state: Game) => state.requiredActions)
  const playersTable = useSelector((state: Game) => state.players)

  const updateName = useCallback(
    (name: string) => {
      dispatch('UPDATE_PLAYER_NAME', {
        name
      })
    },
    [dispatch]
  )

  const onSelectFaction = useCallback(
    (faction: Factions | null) => {
      dispatch('SELECT_FACTION', {
        faction
      })
    },
    [dispatch]
  )

  const onToggleReady = useCallback(() => {
    setIsReady(curr => !curr)
    if (isReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }, [dispatch, isReady])

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
