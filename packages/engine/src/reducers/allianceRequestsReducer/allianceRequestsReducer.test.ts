import { allianceRequestsReducer } from './allianceRequestsReducer'
import { clientActions } from '../../actions'

describe('allianceRequestsReducer', () => {
  test('requestAlliance', () => {
    expect(
      allianceRequestsReducer(
        [],
        clientActions.REQUEST_ALLIANCE({
          playerId: 'atreides',
          requester: 'atreides',
          responders: ['fremen']
        })
      )
    ).toEqual([{ requester: 'atreides', responders: ['fremen'] }])
  })
  test('leaveGame', () => {
    expect(
      allianceRequestsReducer(
        [{ requester: 'test', responders: ['someone'] }],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([])
  })
})
