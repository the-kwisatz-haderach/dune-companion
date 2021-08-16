import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Game } from '../../models'

export const currentPhaseBuilder = (
  builder: ActionReducerMapBuilder<Game['currentPhase']>
) => builder.addDefaultCase(state => state)
