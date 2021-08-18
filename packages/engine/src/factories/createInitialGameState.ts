import { compose } from '@reduxjs/toolkit'
import { createInitialPlayerConditions } from './createInitialPlayerConditions'
import { createNewTurnState } from './createNewTurnState'

export const createInitialGameState = compose(
  createInitialPlayerConditions,
  createNewTurnState
)
