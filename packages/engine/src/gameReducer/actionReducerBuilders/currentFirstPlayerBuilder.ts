import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Game } from '../../models'

export const currentFirstPlayerBuilder = (
  builder: ActionReducerMapBuilder<Game['currentFirstPlayer']>
) => builder.addDefaultCase(state => state)
