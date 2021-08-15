import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { hostActions } from '../actions'
import { Game } from '../models/game'

const hostActionBuilder = (builder: ActionReducerMapBuilder<Game>) =>
  builder.addCase(hostActions.GAME_UPDATED, (state, action) => {
    state = action.payload.game
  })

export default hostActionBuilder
