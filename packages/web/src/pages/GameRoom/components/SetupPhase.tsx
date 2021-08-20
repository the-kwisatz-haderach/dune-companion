import {
  RequiredAction,
  ClientActionType,
  Game,
  Player
} from '@dune-companion/engine'
import { ReactElement } from 'react'
import { useGame, usePlayer } from '../../../dune-react'
import CharacterSelect from './CharacterSelect'
import PlayerSetup from './PlayerSetup'

const createPendingActionsChecker = (game: Game) => {
  const checker = (playerIds: string[], actionType: ClientActionType) =>
    playerIds.every(id =>
      game.requiredActions.some(
        (action: RequiredAction) =>
          action.type === actionType && action.playerId === id
      )
    )
  return (actionType: ClientActionType) => ({
    forPlayer: (playerId: Player['id']) => checker([playerId], actionType),
    forAnyPlayer: () => checker(Object.keys(game.players), actionType)
  })
}

export default function SetupPhase(): ReactElement {
  const game = useGame()
  const player = usePlayer()

  const isPending = createPendingActionsChecker(game)

  if (isPending('UPDATE_PLAYER_NAME').forPlayer(player.id)) {
    return <PlayerSetup />
  }

  if (isPending('SELECT_FACTION').forAnyPlayer()) {
    return <CharacterSelect />
  }

  return <CharacterSelect />
}
