import { createReducer, compose } from '@reduxjs/toolkit'
import clientActionBuilder from './clientActionBuilder'
import hostActionBuilder from './hostActionBuilder'
import { initialGameState } from '../library/constants/initialGameState'

export const gameReducer = createReducer(
  initialGameState,
  compose(hostActionBuilder, clientActionBuilder)
)
