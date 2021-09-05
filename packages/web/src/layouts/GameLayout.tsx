import React from 'react'
import { Box } from '@material-ui/core'
import { useGame } from '../dune-react'
import { ConditionsMenu } from '../components/ConditionsMenu'

export const GameLayout: React.FC = ({ children }) => {
  const game = useGame()
  const firstPlayerName = 'Atreides'
  // game.players[game.playerOrder[game.currentFirstPlayer]].name

  return (
    <Box position="relative">
      {game.currentTurn > 0 && (
        <ConditionsMenu
          maxTurns={game.conditions.maxTurns}
          currentFirstPlayer={firstPlayerName}
          currentPhase={game.currentPhase}
          currentTurn={game.currentTurn}
        />
      )}
      {children}
    </Box>
  )
}
