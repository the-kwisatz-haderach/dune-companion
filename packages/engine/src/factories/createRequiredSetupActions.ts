import { requiredPhaseActions } from '../dictionaries'
import { AwaitingAction, Player } from '../models'

export const createRequiredSetupActions = (
  playerIds: Player['id'][]
): AwaitingAction[] =>
  playerIds.flatMap<AwaitingAction>(playerId =>
    requiredPhaseActions.SETUP.map(type => ({
      type,
      playerId
    }))
  )
