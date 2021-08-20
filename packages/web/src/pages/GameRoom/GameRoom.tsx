import { Box, Typography } from '@material-ui/core'
import { useCallback, ReactElement, useState } from 'react'
import { Factions } from '@dune-companion/engine'
import { useParams } from 'react-router-dom'
import PlayerSetup from './components/PlayerSetup'
import useUserContext from '../../contexts/UserContext'
import { usePlayer, useGameDispatch, useGame } from '../../dune-react'
import CharacterSelect from './components/CharacterSelect'
import SetupPhase from './components/SetupPhase'

export default function GameRoom(): ReactElement {
  const [isReady, setIsReady] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { username } = useUserContext()
  const dispatch = useGameDispatch()
  const player = usePlayer()
  const game = useGame()

  if (game.currentPhase === 'SETUP') {
    return <SetupPhase />
  }

  return (
    <Box p={1}>
      <Typography>Room {id}</Typography>
    </Box>
  )
}
