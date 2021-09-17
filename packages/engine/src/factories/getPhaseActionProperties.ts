import { phaseActions, adminPhaseActions } from '../dictionaries'
import { Phases, PlayerAction } from '../models'
import { getActionProperties } from './getActionProperties'

export const getPhaseActionProperties = (
  phase: Phases,
  isAdmin = false
): PlayerAction[] =>
  phaseActions[phase]
    .map(type => getActionProperties(type))
    .concat(
      isAdmin
        ? adminPhaseActions[phase].map(type => getActionProperties(type))
        : []
    )
