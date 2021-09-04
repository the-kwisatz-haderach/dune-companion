import React from 'react'
import { Box } from '@material-ui/core'
import { ActionMenu } from '../components/ActionMenu'
import { useGame, useGameDispatch, usePlayer } from '../dune-react'
import { ConditionsMenu } from '../components/ConditionsMenu'

export const GameLayout: React.FC = ({ children }) => {
  const player = usePlayer()
  const game = useGame()
  const dispatch = useGameDispatch()

  const hasPlayerSelectedFaction = !player?.actions.some(
    action => action.type === 'SELECT_FACTION'
  )

  const isPlayerReady = !player?.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const firstPlayerName = 'Atreides'
  // game.players[game.playerOrder[game.currentFirstPlayer]].name

  const onToggleReady = () => {
    if (isPlayerReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

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
      {hasPlayerSelectedFaction && (
        <ActionMenu
          primaryActionLabel={isPlayerReady ? 'Not ready' : 'Ready'}
          primaryActionType={isPlayerReady ? 'negative' : 'positive'}
          onPrimaryAction={onToggleReady}
        />
      )}
      {children}
    </Box>
  )
}
