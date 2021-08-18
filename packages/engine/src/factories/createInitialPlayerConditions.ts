import { factions } from '../dictionaries'
import { Game } from '../models'

export const createInitialPlayerConditions = (state: Game): Game => ({
  ...state,
  players: Object.keys(state.players).reduce<Game['players']>(
    (acc, playerId) => {
      const player = state.players[playerId]
      return {
        ...acc,
        [playerId]: {
          ...player,
          spice: player.faction
            ? factions[player.faction].startingSpice
            : player.spice,
          treacheryCards: player.faction
            ? factions[player.faction].startingItems
            : player.treacheryCards
        }
      }
    },
    {}
  )
})
