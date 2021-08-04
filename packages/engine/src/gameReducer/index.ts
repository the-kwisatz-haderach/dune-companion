import { createReducer, compose } from '@reduxjs/toolkit'
import playerActionBuilder from './playerActionBuilder'
import engineActionBuilder from './engineActionBuilder'
import { initialGameState } from '../library/constants/initialGameState'

export const gameReducer = createReducer(
  initialGameState,
  compose(engineActionBuilder, playerActionBuilder)
)
