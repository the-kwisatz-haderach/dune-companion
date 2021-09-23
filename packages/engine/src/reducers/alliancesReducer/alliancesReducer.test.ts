import { alliancesReducer } from './alliancesReducer'
import { clientActions } from '../../actions'

describe('alliancesReducer', () => {
  test('leaveGame', () => {
    expect(
      alliancesReducer(
        [{ players: ['test', 'other', 'third'], status: 'confirmed' }],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([{ players: ['other', 'third'], status: 'confirmed' }])
  })
})
