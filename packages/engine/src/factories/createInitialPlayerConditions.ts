import { factions, phaseOrder } from '../dictionaries'
import { Game } from '../models'
import { getPhaseActionProperties } from './getPhaseActionProperties'

const [firstRegularPhase] = phaseOrder

export const createInitialPlayerConditions = (state: Game): Game => ({
  ...state,
  players: Object.keys(state.players).reduce<Game['players']>(
    (acc, playerId) => {
      const player = state.players[playerId]
      return {
        ...acc,
        [playerId]: {
          ...player,
          actions: getPhaseActionProperties(firstRegularPhase, player.isAdmin),
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
