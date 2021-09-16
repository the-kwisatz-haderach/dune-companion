import { factions, phaseOrder } from '../dictionaries'
import { Game } from '../models'
import { getPhaseActionProperties } from './getPhaseActionProperties'

const [firstRegularPhase] = phaseOrder

export const createInitialPlayerConditions = (state: Game): Game => ({
  ...state,
  players: Object.values(state.players).reduce(
    (acc, player) => ({
      ...acc,
      [player.id]: {
        ...player,
        actions: getPhaseActionProperties(firstRegularPhase, player.isAdmin),
        spice: player.faction
          ? factions[player.faction].startingSpice
          : player.spice,
        treacheryCards: player.faction
          ? factions[player.faction].startingItems
          : player.treacheryCards
      }
    }),
    {}
  )
})
