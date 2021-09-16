import {
  requiredPhaseActions,
  requiredPhaseAdminActions
} from '../dictionaries'
import { Phases, PlayerAction } from '../models'
import { getActionProperties } from './getActionProperties'

export const getPhaseActionProperties = (
  phase: Phases,
  isAdmin = false
): PlayerAction[] => {
  const regularPhaseActions = requiredPhaseActions[phase].map(type =>
    getActionProperties(type)
  )
  const adminPhaseActions = isAdmin
    ? requiredPhaseAdminActions[phase].map(type => getActionProperties(type))
    : []
  return regularPhaseActions.concat(adminPhaseActions)
}
