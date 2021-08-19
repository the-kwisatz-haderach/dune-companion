import { ClientActionType } from '../actions'
import { Phase, Phases } from '../models/phase'

export const phaseOrder: Phases[] = [
  'STORM',
  'SPICE_BLOW_AND_NEXUS',
  'CHOAM_CHARITY',
  'BIDDING',
  'REVIVAL',
  'SHIPMENT_AND_MOVEMENT',
  'BATTLE',
  'SPICE_HARVEST',
  'MENTAT_PAUSE'
]

export const requiredPhaseActions: Record<
  Phases | 'SETUP',
  ClientActionType[]
> = {
  SETUP: ['UPDATE_PLAYER_NAME', 'SELECT_FACTION', 'SET_IS_READY'],
  STORM: ['SET_IS_READY'],
  SPICE_BLOW_AND_NEXUS: ['SET_IS_READY'],
  CHOAM_CHARITY: ['SET_IS_READY'],
  BIDDING: ['SET_IS_READY'],
  REVIVAL: ['SET_IS_READY'],
  SHIPMENT_AND_MOVEMENT: ['SET_IS_READY'],
  BATTLE: ['SET_IS_READY'],
  SPICE_HARVEST: ['SET_IS_READY'],
  MENTAT_PAUSE: ['SET_IS_READY']
}

export const phases: Record<Phases, Phase> = {
  STORM: {
    name: 'Storm',
    description: ''
  },
  SPICE_BLOW_AND_NEXUS: {
    name: 'Spice blow and nexus',
    description: ''
  },
  CHOAM_CHARITY: {
    name: 'Choam charity',
    description: ''
  },
  BIDDING: {
    name: 'Bidding',
    description: ''
  },
  REVIVAL: {
    name: 'Revival',
    description: ''
  },
  SHIPMENT_AND_MOVEMENT: {
    name: 'Shipment and movement',
    description: ''
  },
  BATTLE: {
    name: 'Battle',
    description: ''
  },
  SPICE_HARVEST: {
    name: 'Spice harvest',
    description: ''
  },
  MENTAT_PAUSE: {
    name: 'Mentat pause',
    description: ''
  }
}
