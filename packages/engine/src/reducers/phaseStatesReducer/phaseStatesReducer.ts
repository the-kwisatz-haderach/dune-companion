import { createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Phases } from '../../models'
import { initialGameState } from '../initialGameState'

export const phaseStatesReducer = createReducer(
  initialGameState.phaseStates,
  builder =>
    builder
      .addCase(clientActions.MARK_PHASE_STEP_NOT_COMPLETED, (state, action) => {
        Object.keys(state).forEach(phase => {
          if (
            action.payload.step in state[phase as Exclude<Phases, 'FINISHED'>]
          ) {
            ;(state[phase as Exclude<Phases, 'FINISHED'>] as any)[
              action.payload.step
            ] = false
          }
        })
      })
      .addCase(clientActions.MARK_PHASE_STEP_COMPLETED, (state, action) => {
        Object.keys(state).forEach(phase => {
          if (
            action.payload.step in state[phase as Exclude<Phases, 'FINISHED'>]
          ) {
            ;(state[phase as Exclude<Phases, 'FINISHED'>] as any)[
              action.payload.step
            ] = true
          }
        })
      })
)
