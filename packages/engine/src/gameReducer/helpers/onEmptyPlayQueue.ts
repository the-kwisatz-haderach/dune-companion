import { Game } from '../../models/game'

const onEmptyPlayQueue = (game: Game): Game => {
  const { currentTurn } = game
  return game
}

export default onEmptyPlayQueue
