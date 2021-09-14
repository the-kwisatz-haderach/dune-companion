import {
  requiredPhaseActions,
  requiredPhaseAdminActions
} from '../dictionaries'
import { Game } from '../models'
import { initialGameState } from '../reducers/initialGameState'
import { createPlayerAction } from './createPlayerAction'

export const createNewTurnState = (state: Game): Game => ({
  ...state,
  phaseStates: initialGameState.phaseStates,
  currentTurn: state.currentTurn + 1,
  currentPhase: 'STORM',
  players: Object.keys(state.players).reduce<Game['players']>(
    (players, playerId) => ({
      ...players,
      [playerId]: {
        ...players[playerId],
        actions: [
          ...requiredPhaseActions.STORM.map(type => createPlayerAction(type)),
          ...(state.players[playerId].isAdmin
            ? requiredPhaseAdminActions.STORM.map(type =>
                createPlayerAction(type)
              )
            : [])
        ]
      }
    }),
    state.players
  )
})
