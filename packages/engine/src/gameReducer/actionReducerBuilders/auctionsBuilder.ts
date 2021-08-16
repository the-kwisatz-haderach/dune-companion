import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Game } from '../../models'

export const auctionsBuilder = (
  builder: ActionReducerMapBuilder<Game['auctions']>
) => builder.addDefaultCase(state => state)
