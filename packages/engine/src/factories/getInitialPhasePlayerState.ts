import { firstRegularPhase } from '../dictionaries'
import { Game, Player } from '../models'
import { getPhaseActionProperties } from './getPhaseActionProperties'

export const getInitialPhasePlayerState = (
  state: Game
): Record<string, Player> =>
  Object.values(state.players).reduce(
    (players, player) => ({
      ...players,
      [player.id]: {
        ...player,
        actions: getPhaseActionProperties(firstRegularPhase, player.isAdmin)
      }
    }),
    state.players
  )
