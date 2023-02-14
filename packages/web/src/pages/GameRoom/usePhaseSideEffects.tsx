import { Phases } from '@dune-companion/engine'
import { useEffect } from 'react'
import usePromptContext from '../../contexts/PromptContext'
import { usePlayer } from '../../dune-react'

export const usePhaseSideEffects = (currentPhase: Phases) => {
  const showPrompt = usePromptContext()
  const player = usePlayer()

  useEffect(() => {
    if (currentPhase !== 'FACTION_SELECT') {
      if (!player.name) {
        return showPrompt('PlayerSetupPrompt', {})
      } else if (!player.faction) {
        showPrompt('FactionSelectPrompt', {})
      }
    }
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
          showPrompt('SetPlayerTreacheryCardsPrompt', {})
          break
        }
      }
    }
  }, [
    showPrompt,
    currentPhase,
    player.name,
    player.hasCompletedPhase,
    player.faction
  ])
}
