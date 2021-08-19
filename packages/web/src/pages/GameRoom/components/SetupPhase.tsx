import { ReactElement } from 'react'
import { useGame, usePlayer } from '../../../dune-react'
import CharacterSelect from './CharacterSelect'
import PlayerSetup from './PlayerSetup'

export default function SetupPhase(): ReactElement {
  const game = useGame()
  const player = usePlayer()

  const isUpdateNameRequired = game.requiredActions.some(
    action =>
      action.type === 'UPDATE_PLAYER_NAME' && action.playerId === player.id
  )

  if (isUpdateNameRequired) {
    return <PlayerSetup />
  }

  return <CharacterSelect />
}
