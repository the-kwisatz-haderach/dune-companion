import { phaseActions, adminPhaseActions } from '../dictionaries'
import { Phases, PlayerAction } from '../models'
import { getActionProperties } from './getActionProperties'

export const getPhaseActionProperties = (
  phase: Phases,
  isAdmin = false
): PlayerAction[] =>
  (isAdmin
    ? adminPhaseActions[phase].map(type => getActionProperties(type))
    : []
  ).concat(phaseActions[phase].map(type => getActionProperties(type)))
