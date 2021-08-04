import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { engineActions } from '../actions'
import { phases } from '../library/constants/phases'
import { Game } from '../models/game'

const engineActionBuilder = (builder: ActionReducerMapBuilder<Game>) =>
  builder
    .addCase(engineActions.INCREMENT_PHASE, state => {
      const phaseKeys = Object.keys(phases)
      state.currentPhase = (state.currentPhase + 1) % phaseKeys.length
    })
    .addCase(engineActions.INCREMENT_TURN, state => {
      state.currentTurn += 1
      state.currentPhase = 0
    })
    .addCase(engineActions.UPDATE_GAME, (state, action) => {
      state = action.payload.game
    })

export default engineActionBuilder
