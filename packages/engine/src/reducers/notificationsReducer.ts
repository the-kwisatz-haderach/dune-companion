import { createReducer } from '@reduxjs/toolkit'
import { initialGameState } from '../constants'

export const notificationsReducer = createReducer(
  initialGameState.notifications,
  builder => builder.addDefaultCase(state => state)
)
