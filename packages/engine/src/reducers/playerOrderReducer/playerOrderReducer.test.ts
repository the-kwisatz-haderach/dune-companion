import { playerOrderReducer } from './playerOrderReducer'
import { clientActions } from '../../actions'
import { initialGameState } from '../initialGameState'

describe('playerOrderReducer', () => {
  test('setPlayerOrder', () => {
    expect(
      playerOrderReducer(
        ['three', 'two', 'one'],
        clientActions.SET_PLAYER_ORDER({
          playerId: 'test',
          playerOrder: ['one', 'two', 'three']
        })
      )
    ).toEqual(['one', 'two', 'three'])
  })
  test('CREATE_GAME', () => {
    expect(
      playerOrderReducer(
        [],
        clientActions.CREATE_GAME({
          conditions: {
            maxTurns: initialGameState.maxTurns,
            isAdvancedMode: initialGameState.isAdvancedMode,
            maxPlayers: initialGameState.maxPlayers
          },
          roomId: 'someRoom',
          playerId: 'test'
        })
      )
    ).toEqual(['test'])
  })
  test('JOIN_GAME', () => {
    expect(
      playerOrderReducer(
        ['other', 'third'],
        clientActions.JOIN_GAME({ roomId: 'someRoom', playerId: 'test' })
      )
    ).toEqual(['other', 'third', 'test'])
  })
  test('leaveGame', () => {
    expect(
      playerOrderReducer(
        ['test', 'other', 'third'],
        clientActions.LEAVE_GAME({ playerId: 'test', roomId: 'test' })
      )
    ).toEqual(['other', 'third'])
  })
})
