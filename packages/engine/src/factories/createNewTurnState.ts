import { firstRegularPhase } from '../dictionaries'
import { Game } from '../models'
import { initialGameState } from '../reducers/initialGameState'
import { getInitialPhasePlayerState } from './getInitialPhasePlayerState'

export const createNewTurnState = (state: Game): Game => ({
  ...state,
  phaseStates: initialGameState.phaseStates,
  currentTurn: state.currentTurn + 1,
  currentFirstPlayer: null,
  currentPhase: firstRegularPhase,
  players: getInitialPhasePlayerState(state)
})
