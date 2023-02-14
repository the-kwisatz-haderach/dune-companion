import { Factions, Player, Game, Auction } from '../../models'

export function createAuction(game: Game): Auction {
  const participants: Player[] = []
  for (let i = 0; i < game.playerOrder.length; i++) {
    const playerId =
      game.playerOrder[
        (i + (game.currentFirstPlayer ?? 0)) % game.playerOrder.length
      ]
    const player = game.players[playerId]
    if (
      player.treacheryCards < 4 ||
      (player.faction === Factions.HOUSE_HARKONNEN && player.treacheryCards < 8)
    ) {
      participants.push(player)
    }
  }

  return {
    isDone: false,
    isRunning: false,
    participants,
    currentBidderIndex: 0,
    lastActionTimestamp: '',
    rounds: [
      {
        bids: [],
        skipped: []
      }
    ]
  }
}
