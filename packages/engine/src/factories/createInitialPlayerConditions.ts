import {
  factions,
  requiredPhaseActions,
  requiredPhaseAdminActions
} from '../dictionaries'
import { Game } from '../models'
import { createPlayerAction } from './createPlayerAction'

export const createInitialPlayerConditions = (state: Game): Game => ({
  ...state,
  players: Object.keys(state.players).reduce<Game['players']>(
    (acc, playerId) => {
      const player = state.players[playerId]
      return {
        ...acc,
        [playerId]: {
          ...player,
          actions: [
            ...requiredPhaseActions.STORM.map(type => createPlayerAction(type)),
            ...(player.isAdmin
              ? requiredPhaseAdminActions.STORM.map(type =>
                  createPlayerAction(type)
                )
              : [])
          ],
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
