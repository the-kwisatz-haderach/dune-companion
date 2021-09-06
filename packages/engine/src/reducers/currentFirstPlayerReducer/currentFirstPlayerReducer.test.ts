import { clientActions } from '../../actions'
import { currentFirstPlayerReducer } from './currentFirstPlayerReducer'

describe('currentFirstPlayerReducer', () => {
  test('SET_FIRST_PLAYER', () => {
    expect(
      currentFirstPlayerReducer(
        4,
        clientActions.SET_FIRST_PLAYER({
          playerId: 'test',
          firstPlayerIndex: 1
        })
      )
    ).toEqual(1)
  })
})
