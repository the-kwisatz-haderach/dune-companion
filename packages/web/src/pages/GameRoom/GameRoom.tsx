import { Box, Typography } from '@material-ui/core'
import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useGame } from '../../dune-react'
import SetupPhase from './components/SetupPhase'

export default function GameRoom(): ReactElement {
  const { id } = useParams<{ id: string }>()
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
