import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { initialGameState } from '../../constants'
import { Game } from '../../models'

export const auctionsReducer = createReducer(
  initialGameState.auctions,
  (builder: ActionReducerMapBuilder<Game['auctions']>) =>
    builder.addDefaultCase(state => state)
)
