import { Game } from '../models'

export const createNewPhasePlayerState = (players: Game['players']) =>
  Object.values(players).reduce<Game['players']>(
    (players, player) => ({
      ...players,
      [player.id]: {
        ...player,
        hasCompletedPhase: false
      }
    }),
    players
  )
