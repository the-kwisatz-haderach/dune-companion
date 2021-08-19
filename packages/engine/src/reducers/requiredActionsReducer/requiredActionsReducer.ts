import { createReducer, Reducer } from '@reduxjs/toolkit'
import { ClientAction, clientActions } from '../../actions'
import { createRequiredSetupActions } from '../../factories/createRequiredSetupActions'
import { append } from '../../helpers'
import { AwaitingAction, Game } from '../../models'
import { initialGameState } from '../initialGameState'

const removeCompleted: Reducer<
  Game['requiredActions'],
  ClientAction
> = createReducer(initialGameState.requiredActions, builder =>
  builder
    .addMatcher(
      action =>
        action.type === 'RESPOND_TO_ALLIANCE_REQUEST' &&
        action.payload.response === 'decline',
      state =>
        state.filter(
          waitingAction =>
            !(
              waitingAction.type === 'RESPOND_TO_ALLIANCE_REQUEST' &&
              waitingAction.relatedPlayers?.includes(waitingAction.playerId)
            )
        )
    )
    .addMatcher(
      action => 'payload' in action && 'playerId' in action?.payload,
      (state, action) =>
        state.filter(
          waitingAction =>
            !(
              waitingAction.playerId === action.payload.playerId &&
              waitingAction.type === action.type
            )
        )
    )
)

const addReaction = createReducer(initialGameState.requiredActions, builder =>
  builder
    .addCase(clientActions.SELECT_FACTION, (state, action) => {
      if (action.payload.faction === null) {
        return [
          ...state,
          {
            playerId: action.payload.playerId,
            type: 'SELECT_FACTION'
          }
        ]
      }
    })
    .addCase(clientActions.SET_IS_NOT_READY, (state, action) =>
      append(state, {
        playerId: action.payload.playerId,
        type: 'SET_IS_READY'
      })
    )
    .addCase(clientActions.REQUEST_ALLIANCE, (state, action) => [
      ...state,
      ...action.payload.responders.map<AwaitingAction>(responder => ({
        playerId: responder,
        type: 'RESPOND_TO_ALLIANCE_REQUEST',
        relatedPlayers: action.payload.responders
      }))
    ])
    .addMatcher(
      action => ['JOIN_GAME', 'CREATE_GAME'].includes(action.type),
      (state, action) => [
        ...state,
        ...createRequiredSetupActions([action.payload.playerId])
      ]
    )
)

export const requiredActionsReducer: Reducer<
  Game['requiredActions'],
  ClientAction
> = (state = initialGameState.requiredActions, action) =>
  addReaction(removeCompleted(state, action), action)
