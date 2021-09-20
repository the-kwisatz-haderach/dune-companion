import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const currentPhaseReducer = createReducer(
  initialGameState.currentPhase,
  (builder: ActionReducerMapBuilder<Game['currentPhase']>) =>
    builder.addCase(clientActions.GO_TO_NEXUS, () => 'NEXUS')
)
