import { ClientActionType, Game, Player } from '@dune-companion/engine'

export const createPendingActionsChecker = (players: Game['players']) => {
  const checker = (playerIds: string[], actionType: ClientActionType) =>
    playerIds.some(id =>
      players[id].actions.some(
        action => action.type === actionType && action.isRequired
      )
    )
  return (actionType: ClientActionType) => ({
    forPlayer: (playerId: Player['id']) => checker([playerId], actionType),
    forAnyPlayer: () => checker(Object.keys(players), actionType)
  })
}
