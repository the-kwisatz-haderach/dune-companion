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

export const requiredPhaseActions = {
  SETUP: ['UPDATE_PLAYER_NAME', 'SELECT_FACTION', 'SET_IS_READY'],
  STORM: ['SET_IS_READY'],
  SPICE_BLOW_AND_NEXUS: ['SET_IS_READY'],
  CHOAM_CHARITY: ['SET_IS_READY'],
  BIDDING: ['SET_PLAYER_SPICE', 'SET_PLAYER_TREACHERY_CARDS', 'SET_IS_READY'],
  REVIVAL: ['SET_IS_READY'],
  SHIPMENT_AND_MOVEMENT: ['SET_IS_READY'],
  BATTLE: ['SET_IS_READY'],
  SPICE_HARVEST: ['SET_IS_READY'],
  MENTAT_PAUSE: ['SET_IS_READY'],
  FINISHED: []
} as const

export const requiredPhaseAdminActions = {
  SETUP: ['SET_PLAYER_ORDER'],
  STORM: ['SET_FIRST_PLAYER'],
  SPICE_BLOW_AND_NEXUS: [],
  CHOAM_CHARITY: [],
  BIDDING: [],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [],
  BATTLE: [],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [],
  FINISHED: []
} as const

export const phases: Record<Phases, Phase> = {
  SETUP: {
    name: 'Setup',
    description:
      'Players take their Player Shields and player sheets and set up their factions as follows.'
  },
  STORM: {
    name: 'Storm',
    description:
      'The Storm Marker is moved around the map. The faction whose Player Marker the storm next approaches will be the First Player for this turn.'
  },
  SPICE_BLOW_AND_NEXUS: {
    name: 'Spice blow and nexus',
    description:
      'The top card of the Spice Deck is turned over and the amount of spice shown on the card is placed in the highlighted territory. If Shai-Hulud appears during the Spice Blow Phase, a Nexus occurs and the players have the opportunity to make and break Alliances.'
  },
  CHOAM_CHARITY: {
    name: 'Choam charity',
    description: 'Players with 0 or 1 spice may claim CHOAM Charity.'
  },
  BIDDING: {
    name: 'Bidding',
    description: 'Players bid spice to acquire Treachery Cards'
  },
  REVIVAL: {
    name: 'Revival',
    description:
      'All players are allowed to reclaim forces and leaders from the Tleilaxu Tanks.'
  },
  SHIPMENT_AND_MOVEMENT: {
    name: 'Shipment and movement',
    description:
      'Starting with the First Player and proceeding counterclockwise, each player in turn ships forces down to the planet or brings in forces from the southern hemisphere (Fremen) and then moves their forces on the game board.'
  },
  BATTLE: {
    name: 'Battle',
    description:
      'Players must resolve battles in every territory that is occupied by forces from two or more factions.'
  },
  SPICE_HARVEST: {
    name: 'Spice harvest',
    description:
      'Forces in territories that contain spice may collect the spice.'
  },
  MENTAT_PAUSE: {
    name: 'Mentat pause',
    description:
      'Factions either declare a winner (or winners) or take some time to evaluate their positions on the map and then move the Turn Counter to the next position on the Turn Track to begin the next turn.'
  },
  FINISHED: {
    name: 'Finished',
    description: ''
  }
}
