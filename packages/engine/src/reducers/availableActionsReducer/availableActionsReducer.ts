import { Game, Phases } from '../../models'
import {
  AvailableActionCollection,
  AvailablePlayerActionsMap
} from '../../models/availablePlayerActions'
import { initialGameState } from '../initialGameState'

const reducePlayerPhaseActions = (
  state: Game
): Record<Phases, AvailableActionCollection> => ({
  [Phases.STORM]: {
    primary: [], // If Fremen is in game
    secondary: []
  },
  [Phases.SPICE_BLOW_AND_NEXUS]: {
    primary: [],
    secondary: []
  },
  [Phases.CHOAM_CHARITY]: {
    primary: [],
    secondary: []
  },
  [Phases.BIDDING]: {
    primary: [],
    secondary: []
  },
  [Phases.REVIVAL]: {
    primary: [],
    secondary: []
  },
  [Phases.SHIPMENT_AND_MOVEMENT]: {
    primary: [],
    secondary: []
  },
  [Phases.BATTLE]: {
    primary: [],
    secondary: []
  },
  [Phases.SPICE_HARVEST]: {
    primary: [],
    secondary: []
  },
  [Phases.MENTAT_PAUSE]: {
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
