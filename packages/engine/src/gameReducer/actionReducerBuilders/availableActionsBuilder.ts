import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Game } from '../../models'

export const availableActionsBuilder = (
  builder: ActionReducerMapBuilder<Game['availableActions']>
) => builder.addDefaultCase(state => state)
