import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'

export const currentTurnBuilder = (
  builder: ActionReducerMapBuilder<Game['currentTurn']>
) => builder.addCase(clientActions.START_GAME, () => 1)
