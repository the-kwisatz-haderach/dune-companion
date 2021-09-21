import { Game } from '..'

const getAvailableActions = (game: Game) => {
  switch (game.currentPhase) {
    case 'FACTION_SELECT': {
      return []
    }
  }
}
