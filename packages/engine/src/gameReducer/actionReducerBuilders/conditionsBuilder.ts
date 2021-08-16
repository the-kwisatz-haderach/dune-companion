import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'

export const conditionsBuilder = (
  builder: ActionReducerMapBuilder<Game['conditions']>
) =>
  builder.addCase(
    clientActions.CREATE_GAME,
    (_, action) => action.payload.conditions
  )
