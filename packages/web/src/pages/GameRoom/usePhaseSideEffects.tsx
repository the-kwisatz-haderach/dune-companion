import { Phases } from '@dune-companion/engine'
import { useEffect } from 'react'
import usePromptContext from '../../contexts/PromptContext'
import { usePlayer } from '../../dune-react'

export const usePhaseSideEffects = (currentPhase: Phases) => {
  const showPrompt = usePromptContext()
  const player = usePlayer()

  useEffect(() => {
    switch (currentPhase) {
      case 'FACTION_SELECT': {
        if (player.name === '') {
          showPrompt('PlayerSetupPrompt', {})
        }
        break
      }
      case 'BIDDING': {
        if (!player.hasCompletedPhase) {
          showPrompt('SetPlayerSpicePrompt', {})
          break
        }
        if (player.hasCompletedPhase) {
          setTimeout(() => {
            showPrompt('SetPlayerTreacheryCardsPrompt', {})
          }, 1000)
          break
        }
      }
    }
  }, [showPrompt, currentPhase, player?.name, player.hasCompletedPhase])
}
