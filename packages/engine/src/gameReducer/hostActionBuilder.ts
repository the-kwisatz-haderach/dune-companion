import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { hostActions } from '../actions'
import { Game } from '../models/game'

const hostActionBuilder = (builder: ActionReducerMapBuilder<Game>) =>
  builder.addCase(hostActions.UPDATE_GAME, (state, action) => {
    state = action.payload.game
  })

export default hostActionBuilder
