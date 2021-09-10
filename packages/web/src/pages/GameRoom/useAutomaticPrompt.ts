import { useEffect } from 'react'
import usePromptContext from '../../contexts/PromptContext'
import { useGame, usePlayer } from '../../dune-react'

export const useAutomaticPrompt = () => {
  const showPrompt = usePromptContext()
  const player = usePlayer()
  const game = useGame()

  useEffect(() => {
    switch (game.currentPhase) {
      case 'SETUP': {
        if (player.name === '') {
          showPrompt('PlayerSetupPrompt', {})
        }
        break
      }
    }
  }, [showPrompt, game.currentPhase, player])
}
