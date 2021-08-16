import { allianceRequestsReducer } from './allianceRequestsReducer'
import { clientActions } from '../../actions'

describe('allianceRequestsReducer', () => {
  test('requestAlliance', () => {
    expect(
      allianceRequestsReducer(
        [],
        clientActions.REQUEST_ALLIANCE({
          playerId: 'test',
          requester: 'atreides',
          responder: 'fremen'
        })
      )
    ).toEqual([{ requester: 'atreides', responder: 'fremen' }])
  })
  test('leaveGame', () => {
    expect(
      allianceRequestsReducer(
        [{ requester: 'test', responder: 'someone' }],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([])
  })
})
