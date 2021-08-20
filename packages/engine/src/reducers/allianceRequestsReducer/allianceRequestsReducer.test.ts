import { allianceRequestsReducer } from './allianceRequestsReducer'
import { clientActions } from '../../actions'

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'mockNanoId'
}))

describe('allianceRequestsReducer', () => {
  test('requestAlliance', () => {
    expect(
      allianceRequestsReducer(
        [],
        clientActions.REQUEST_ALLIANCE({
          playerId: 'atreides',
          responders: ['fremen']
        })
      )
    ).toEqual([
      { id: 'mockNanoId', requester: 'atreides', responders: ['fremen'] }
    ])
  })
  test('leaveGame', () => {
    expect(
      allianceRequestsReducer(
        [{ id: 'mockNanoId', requester: 'test', responders: ['someone'] }],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([])
  })
})
