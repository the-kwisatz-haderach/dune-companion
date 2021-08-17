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
