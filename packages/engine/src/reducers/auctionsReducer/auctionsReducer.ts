import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const auctionsReducer = createReducer(
  initialGameState.auctions,
  (builder: ActionReducerMapBuilder<Game['auctions']>) =>
    builder.addDefaultCase(state => state)
)
