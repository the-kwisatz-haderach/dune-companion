import {
  createFinishedGameState,
  createNextPhaseState,
  createNewTurnState,
  createNewAuctionState
} from '../../factories'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const phaseCompletionReducer = (
  state: Game = initialGameState
): Game => {
  switch (state.currentPhase) {
    case 'FACTION_SELECT':
      if (playerBasicsSet(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'SETUP':
      if (playersReady(state)) {
        return createNewTurnState(state)
      }
      return state
    case 'STORM':
      if (firstPlayerSet(state) && playersReady(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'SPICE_BLOW_AND_NEXUS':
      if (playersReady(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'NEXUS':
      if (playersReady(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'CHOAM_CHARITY':
      if (playersReady(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'BIDDING':
      /*
        On first bid --> start timer
        Bid/Skip -> next player. 
        if all have passed or one player is left
        - Stop timer
        else
        - Repeat

        Next round:
          if rounds < participants
          - Repeat by creating a new round
          else
          - isDone is true
        */
      if (!state.auctions[state.currentTurn]?.isDone) {
        return createNewAuctionState(state)
      }
      return state
    case 'SHIPMENT_AND_MOVEMENT':
      if (playersReady(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'BATTLE':
      if (playersReady(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'SPICE_HARVEST':
      if (playersReady(state)) {
        return createNextPhaseState(state)
      }
      return state
    case 'MENTAT_PAUSE':
      if (playersReady(state)) {
        return state.currentTurn === state.maxTurns
          ? createFinishedGameState(state)
          : createNewTurnState(state)
      }
      return state
    default:
      return state
  }
}

function playersReady(state: Game) {
  return Object.values(state.players).every(player => player.hasCompletedPhase)
}

function firstPlayerSet(state: Game) {
  return state.currentFirstPlayer !== null
}

function playerBasicsSet(state: Game) {
  const players = Object.values(state.players)
  return (
    players.length > 0 &&
    players.every(player => player.faction !== null && player.name !== '')
  )
}
