import { ClientActionType } from '../../actions'
import { factions, phaseOrder } from '../../dictionaries'
import { AwaitingAction, Game, Phases } from '../../models'
import { initialGameState } from '../initialGameState'

const initialPhaseActions: Record<Phases, ClientActionType> = {
  STORM: 'SET_IS_READY',
  SPICE_BLOW_AND_NEXUS: 'SET_IS_READY',
  CHOAM_CHARITY: 'SET_IS_READY',
  BIDDING: 'SET_IS_READY',
  REVIVAL: 'SET_IS_READY',
  SHIPMENT_AND_MOVEMENT: 'SET_IS_READY',
  BATTLE: 'SET_IS_READY',
  SPICE_HARVEST: 'SET_IS_READY',
  MENTAT_PAUSE: 'SET_IS_READY'
}

const createInitialGameState = (players: Game['players']): Game => {
  const playerKeys = Object.keys(players)
  return {
    ...initialGameState,
    currentTurn: 1,
    awaitingActions: Object.keys(players).map<AwaitingAction>(playerId => ({
      playerId,
      type: initialPhaseActions.STORM
    })),
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

const createNextPhaseState = (state: Game): Game => {
  const nextPhase = phaseOrder[phaseOrder.indexOf(state.currentPhase) + 1]
  return {
    ...state,
    currentPhase: nextPhase,
    awaitingActions: Object.keys(state.players).map<AwaitingAction>(
      playerId => ({
        playerId,
        type: initialPhaseActions[nextPhase]
      })
    )
  }
}

const createNextTurnState = (state: Game): Game => ({
  ...state,
  phaseStates: initialGameState.phaseStates,
  currentTurn: state.currentTurn + 1,
  currentPhase: 'STORM',
  awaitingActions: Object.keys(state.players).map<AwaitingAction>(playerId => ({
    playerId,
    type: initialPhaseActions.STORM
  }))
})

const isInProgress = (state: Game) => state.awaitingActions.length !== 0
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
