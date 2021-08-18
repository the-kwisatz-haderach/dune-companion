import { requiredPhaseActions } from '../dictionaries'
import { AwaitingAction, Phases, Player } from '../models'

export const createRequiredPhaseActions = (phase: Phases) => (
  playerIds: Player['id'][]
): AwaitingAction[] =>
  playerIds.flatMap<AwaitingAction>(playerId =>
    requiredPhaseActions[phase].map(type => ({
      type,
      playerId
    }))
  )
