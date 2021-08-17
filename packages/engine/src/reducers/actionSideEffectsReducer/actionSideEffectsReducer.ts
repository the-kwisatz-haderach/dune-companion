import { factions, phases } from '../../dictionaries'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

const reduceGameStartState = (state: Game): Game => {
  const playerKeys = Object.keys(state.players)
  if (playerKeys.length < 2) return state
  return {
    ...state,
    currentTurn: state.currentTurn + 1,
    awaitingAction: playerKeys,
    players: playerKeys.reduce<Game['players']>((acc, playerId) => {
      const player = state.players[playerId]
      return {
        ...acc,
        [playerId]: {
          ...player,
          spice: player.faction
            ? factions[player.faction].startingSpice
            : player.spice,
          treacheryCards: player.faction
            ? factions[player.faction].startingItems
            : player.treacheryCards
        }
      }
    }, {})
  }
}

const reduceNewGamePhaseState = (state: Game): Game => {
  const isFinished = state.currentTurn === state.conditions.maxTurns
  if (isFinished) {
    return {
      ...state,
      isFinished
    }
  }
  const nextPhase = (state.currentPhase + 1) % Object.keys(phases).length
  const isNewTurn = nextPhase === 0
  return {
    ...state,
    phaseStates: isNewTurn ? initialGameState.phaseStates : state.phaseStates,
    currentTurn: isNewTurn ? state.currentTurn + 1 : state.currentTurn,
    currentPhase: nextPhase,
    awaitingAction: Object.keys(state.players)
  }
}

export const actionSideEffectsReducer = (
  state: Game = initialGameState
): Game => {
  const isSetup = state.currentTurn === 0
  const isAwaitingAction = state.awaitingAction.length !== 0
  if (isSetup && !isAwaitingAction) {
    return reduceGameStartState(state)
  } else if (!isAwaitingAction) {
    return reduceNewGamePhaseState(state)
  }
  return state
}
