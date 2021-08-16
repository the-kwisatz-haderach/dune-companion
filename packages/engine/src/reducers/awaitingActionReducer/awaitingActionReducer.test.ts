import { awaitingActionReducer } from './awaitingActionReducer'
import { clientActions } from '../../actions'

describe('awaitingActionReducer', () => {
  test('leaveGame', () => {
    expect(
      awaitingActionReducer(
        ['test'],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([])
  })
})
