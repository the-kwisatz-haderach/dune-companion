import { factions, phaseOrder } from '../../dictionaries'
import { Game, Phases } from '../../models'
import { initialGameState } from '../initialGameState'

const createInitialGameState = (players: Game['players']): Game => {
  const playerKeys = Object.keys(players)
  return {
    ...initialGameState,
    currentTurn: 1,
    awaitingAction: playerKeys,
    players: playerKeys.reduce<Game['players']>((acc, playerId) => {
      const player = players[playerId]
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

const createFinishedGameState = (state: Game): Game => ({
  ...state,
  isFinished: true
})

const createNextPhaseState = (state: Game): Game => ({
  ...state,
  currentPhase: phaseOrder[phaseOrder.indexOf(state.currentPhase) + 1],
  awaitingAction: Object.keys(state.players)
})

const createNextTurnState = (state: Game): Game => ({
  ...state,
  phaseStates: initialGameState.phaseStates,
  currentTurn: state.currentTurn + 1,
  currentPhase: 'STORM',
  awaitingAction: Object.keys(state.players)
})

const isInProgress = (state: Game) => state.awaitingAction.length !== 0
const isLastPhase = (state: Game) => state.currentPhase === 'MENTAT_PAUSE'
const isLastTurn = (state: Game) =>
  state.currentTurn === state.conditions.maxTurns
const isFirstTurn = (state: Game) => state.currentTurn === 0

export const actionSideEffectsReducer = (
  state: Game = initialGameState
): Game => {
  if (isInProgress(state)) return state
  if (isLastPhase(state)) {
    if (isLastTurn(state)) return createFinishedGameState(state)
    return createNextTurnState(state)
  }
  if (isFirstTurn(state)) return createInitialGameState(state.players)
  return createNextPhaseState(state)
}
