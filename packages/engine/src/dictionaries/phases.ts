import { Phase, Phases } from '../models/phase'

export const phaseOrder: Phases[] = [
  'FACTION_SELECT',
  'SETUP',
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

export const firstRegularPhase: Phases = 'STORM'

export const phases: Record<Phases, Phase> = {
  FACTION_SELECT: {
    name: 'Faction Selection',
    description: ''
  },
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
  NEXUS: {
    name: 'Nexus',
    description:
      'Once a Shai-Hulud (sandworm) card is turned over on the second or subsequent turns, at the end of the Spice Blow and NEXUS Phase, a Nexus occurs. During a Nexus, all players have a chance to make, join or break Alliances. Once players have had a chance to do so, play continues.'
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
