import { Game, Phases } from '../../models'
import {
  AvailableActionCollection,
  AvailablePlayerActionsMap
} from '../../models/availablePlayerActions'
import { initialGameState } from '../initialGameState'

const reducePlayerPhaseActions = (
  state: Game
): Record<Phases, AvailableActionCollection> => ({
  STORM: {
    primary: [], // If Fremen is in game
    secondary: []
  },
  SPICE_BLOW_AND_NEXUS: {
    primary: [],
    secondary: []
  },
  CHOAM_CHARITY: {
    primary: [],
    secondary: []
  },
  BIDDING: {
    primary: [],
    secondary: []
  },
  REVIVAL: {
    primary: [],
    secondary: []
  },
  SHIPMENT_AND_MOVEMENT: {
    primary: [],
    secondary: []
  },
  BATTLE: {
    primary: [],
    secondary: []
  },
  SPICE_HARVEST: {
    primary: [],
    secondary: []
  },
  MENTAT_PAUSE: {
    primary: [],
    secondary: []
  }
})

export const availableActionsReducer = (
  state: Game = initialGameState
): Game => {
  const availablePlayerActions: AvailablePlayerActionsMap = {}

  return state
}
