import { Phases, PlayerAction } from '../models'
import { getActionProperties } from './getActionProperties'

export const phaseActions = {
  FACTION_SELECT: ['UPDATE_PLAYER_NAME', 'SELECT_FACTION'],
  SETUP: ['SET_IS_READY'],
  STORM: ['SET_IS_READY'],
  SPICE_BLOW_AND_NEXUS: ['SET_IS_READY'],
  NEXUS: ['SET_IS_READY', 'REQUEST_ALLIANCE'],
  CHOAM_CHARITY: ['SET_IS_READY'],
  BIDDING: [
    'SET_PLAYER_SPICE',
    'SET_PLAYER_TREACHERY_CARDS',
    'PLACE_BID',
    'SKIP_BID',
    'SET_IS_READY'
  ],
  REVIVAL: ['SET_IS_READY'],
  SHIPMENT_AND_MOVEMENT: ['SET_IS_READY'],
  BATTLE: ['SET_IS_READY'],
  SPICE_HARVEST: ['SET_IS_READY'],
  MENTAT_PAUSE: ['SET_IS_READY'],
  FINISHED: []
} as const

export const adminPhaseActions = {
  FACTION_SELECT: [],
  SETUP: ['SET_PLAYER_ORDER'],
  STORM: ['SET_FIRST_PLAYER'],
  SPICE_BLOW_AND_NEXUS: ['GO_TO_NEXUS'],
  NEXUS: [],
  CHOAM_CHARITY: [],
  BIDDING: [],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [],
  BATTLE: [],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [],
  FINISHED: []
} as const

export const getPhaseActionProperties = (
  phase: Phases,
  isAdmin = false
): PlayerAction[] =>
  (isAdmin
    ? adminPhaseActions[phase].map(type => getActionProperties(type))
    : []
  ).concat(phaseActions[phase].map(type => getActionProperties(type)))
