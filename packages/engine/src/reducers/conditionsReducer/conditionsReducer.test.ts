import {
  isAdvancedModeReducer,
  maxPlayersReducer,
  maxTurnsReducer
} from './conditionsReducer'
import { clientActions } from '../../actions'
import { initialGameState } from '../initialGameState'

describe('isAdvancedModeReducer', () => {
  test('createGame', () => {
    expect(
      isAdvancedModeReducer(
        initialGameState.isAdvancedMode,
        clientActions.CREATE_GAME({
          playerId: 'test',
          roomId: 'someId',
          conditions: {
            maxPlayers: 4,
            maxTurns: 5,
            advancedMode: true
          }
        })
      )
    ).toEqual(true)
  })
})
describe('maxPlayersReducer', () => {
  test('createGame', () => {
    expect(
      maxPlayersReducer(
        initialGameState.maxPlayers,
        clientActions.CREATE_GAME({
          playerId: 'test',
          roomId: 'someId',
          conditions: {
            maxPlayers: 4,
            maxTurns: 5,
            advancedMode: true
          }
        })
      )
    ).toEqual(4)
  })
})
describe('maxTurnsReducer', () => {
  test('createGame', () => {
    expect(
      maxTurnsReducer(
        initialGameState.maxTurns,
        clientActions.CREATE_GAME({
          playerId: 'test',
          roomId: 'someId',
          conditions: {
            maxPlayers: 4,
            maxTurns: 5,
            advancedMode: true
          }
        })
      )
    ).toEqual(5)
  })
})
