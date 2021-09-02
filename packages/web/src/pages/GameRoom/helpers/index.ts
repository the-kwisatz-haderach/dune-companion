import { ClientActionType, Game, Player } from '@dune-companion/engine'

export const createPendingActionsChecker = (game: Game) => {
  const checker = (playerIds: string[], actionType: ClientActionType) =>
    playerIds.some(id =>
      game.players[id].actions.some(
        action => action.type === actionType && action.isRequired
      )
    )
  return (actionType: ClientActionType) => ({
    forPlayer: (playerId: Player['id']) => checker([playerId], actionType),
    forAnyPlayer: () => checker(Object.keys(game.players), actionType)
  })
}
