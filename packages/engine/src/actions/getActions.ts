import { Game } from '../models/game'
import { Phases } from '../models/phase'
import { Player } from '../models/player'
import { ClientActionType } from './clientActions'

export default function getPlayerActions(
  player: Player,
  game: Game
): ClientActionType[] {
  const { currentTurn, currentPhase } = game
  const actions: ClientActionType[] = []

  if (currentTurn === 0) {
    actions.push('SELECT_FACTION')
    if (player.isAdmin) {
      actions.push('START_GAME', 'SET_PLAYER_ORDER')
    }
    return actions
  }

  switch (currentPhase) {
    case Phases.STORM:
      return []
  }

  return actions
}
