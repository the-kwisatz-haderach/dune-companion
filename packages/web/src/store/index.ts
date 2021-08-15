import { configureStore, createReducer } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { hostActions, initialGameState } from '@dune-companion/engine'

export const store = configureStore({
  reducer: createReducer(initialGameState, builder =>
    builder.addCase(
      hostActions.GAME_UPDATED,
      (_, action) => action.payload.game
    )
  ),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})
