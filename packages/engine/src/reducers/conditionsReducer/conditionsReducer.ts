import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const maxPlayersReducer = createReducer(
  initialGameState.maxPlayers,
  (builder: ActionReducerMapBuilder<Game['maxPlayers']>) =>
    builder.addCase(
      clientActions.CREATE_GAME,
      (_, action) => action.payload.conditions.maxPlayers
    )
)

export const maxTurnsReducer = createReducer(
  initialGameState.maxTurns,
  (builder: ActionReducerMapBuilder<Game['maxPlayers']>) =>
    builder.addCase(
      clientActions.CREATE_GAME,
      (_, action) => action.payload.conditions.maxTurns
    )
)

export const isAdvancedModeReducer = createReducer(
  initialGameState.isAdvancedMode,
  (builder: ActionReducerMapBuilder<Game['isAdvancedMode']>) =>
    builder.addCase(
      clientActions.CREATE_GAME,
      (_, action) => action.payload.conditions.isAdvancedMode
    )
)
