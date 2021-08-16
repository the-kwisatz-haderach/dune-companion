import { playerOrderReducer } from './playerOrderReducer'
import { clientActions } from '../../actions'

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
  test('leaveGame', () => {
    expect(
      playerOrderReducer(
        ['test', 'other', 'third'],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual(['other', 'third'])
  })
})
