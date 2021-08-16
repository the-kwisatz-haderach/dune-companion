import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { initialGameState } from '../../constants'
import { Game } from '../../models'

export const currentFirstPlayerReducer = createReducer(
  initialGameState.currentFirstPlayer,
  (builder: ActionReducerMapBuilder<Game['currentFirstPlayer']>) =>
    builder.addDefaultCase(state => state)
)
