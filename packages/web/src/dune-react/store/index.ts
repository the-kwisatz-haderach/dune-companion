import { configureStore, createReducer } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { hostActions, initialGameState } from '@dune-companion/engine'

export const createStore = () => {
  const devMiddleware = process.env.NODE_ENV === 'development' ? [logger] : []
  return configureStore({
    reducer: createReducer(initialGameState, builder =>
      builder.addCase(
        hostActions.GAME_UPDATED,
        (_, action) => action.payload.game
      )
    ),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: process.env.NODE_ENV === 'development',
        serializableCheck: process.env.NODE_ENV === 'development',
        thunk: false
      }).concat(devMiddleware)
  })
}
