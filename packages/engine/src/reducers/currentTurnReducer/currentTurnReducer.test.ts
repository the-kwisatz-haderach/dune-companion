import { currentTurnReducer } from './currentTurnReducer'
import { clientActions } from '../../actions'

describe('currentTurnReducer', () => {
  test('startGame', () => {
    expect(
      currentTurnReducer(
        0,
        clientActions.START_GAME({ playerId: 'somePlayer' })
      )
    ).toEqual(1)
  })
})
