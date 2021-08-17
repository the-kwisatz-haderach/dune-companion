import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { ClientAction, clientActions } from '../../actions'
import { Game } from '../../models'
import { append, pull } from '../../helpers'
import { initialGameState } from '../initialGameState'

const pushToList = (state: string[], action: ClientAction) =>
  append(state, action.payload.playerId)

const pullFromList = (state: string[], action: ClientAction) =>
  pull(state, action.payload.playerId)

export const awaitingActionReducer = createReducer(
  initialGameState.awaitingAction,
  (builder: ActionReducerMapBuilder<Game['awaitingAction']>) =>
    builder
      .addCase(clientActions.JOIN_GAME, pushToList)
      .addCase(clientActions.LEAVE_GAME, pullFromList)
      .addCase(clientActions.SET_IS_READY, pullFromList)
      .addCase(clientActions.SET_IS_NOT_READY, pushToList)
)
