import React from 'react'
import { Box } from '@material-ui/core'
import { ActionMenu } from '../components/ActionMenu'
import { useGameDispatch, usePlayer } from '../dune-react'
import { ConditionsMenu } from '../components/ConditionsMenu'

export const GameLayout: React.FC = ({ children }) => {
  const player = usePlayer()
  const dispatch = useGameDispatch()

  const hasPlayerSelectedFaction = !player?.actions.some(
    action => action.type === 'SELECT_FACTION'
  )

  const isPlayerReady = !player?.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isPlayerReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  return (
    <Box position="relative">
      <ConditionsMenu />
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
