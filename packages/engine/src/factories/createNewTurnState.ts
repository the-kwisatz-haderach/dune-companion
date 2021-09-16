import { phaseOrder } from '../dictionaries'
import { Game } from '../models'
import { initialGameState } from '../reducers/initialGameState'
import { getPhaseActionProperties } from './getPhaseActionProperties'

const [firstRegularPhase] = phaseOrder

export const createNewTurnState = (state: Game): Game => ({
  ...state,
  phaseStates: initialGameState.phaseStates,
  currentTurn: state.currentTurn + 1,
  currentPhase: firstRegularPhase,
  players: Object.values(state.players).reduce(
    (players, player) => ({
      ...players,
      [player.id]: {
        ...player,
        actions: getPhaseActionProperties(firstRegularPhase, player.isAdmin)
      }
    }),
    state.players
  )
})
