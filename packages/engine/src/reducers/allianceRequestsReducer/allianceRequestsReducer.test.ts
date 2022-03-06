import { allianceRequestsReducer } from './allianceRequestsReducer'
import { clientActions } from '../../actions'

jest.mock('@reduxjs/toolkit', () => ({
  ...(jest.requireActual('@reduxjs/toolkit') as Record<string, unknown>),
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
  describe('RESPOND_TO_ALLIANCE_REQUEST', () => {
    xtest('the only remaining responder accepts the request', () => {
      expect(
        allianceRequestsReducer(
          [{ id: 'mockNanoId', requester: 'atreides', responders: ['fremen'] }],
          clientActions.RESPOND_TO_ALLIANCE_REQUEST({
            playerId: 'fremen',
            id: 'mockNanoId',
            response: 'accept'
          })
        )
      ).toEqual([])
    })
    test('one of multiple responders accepts the request', () => {
      expect(
        allianceRequestsReducer(
          [
            {
              id: 'mockNanoId',
              requester: 'atreides',
              responders: ['fremen', 'harkonnen']
            }
          ],
          clientActions.RESPOND_TO_ALLIANCE_REQUEST({
            playerId: 'fremen',
            id: 'mockNanoId',
            response: 'accept'
          })
        )
      ).toEqual([
        { id: 'mockNanoId', requester: 'atreides', responders: ['harkonnen'] }
      ])
    })
    xtest('one of multiple responders rejects the request', () => {
      expect(
        allianceRequestsReducer(
          [
            {
              id: 'mockNanoId',
              requester: 'atreides',
              responders: ['fremen', 'harkonnen']
            }
          ],
          clientActions.RESPOND_TO_ALLIANCE_REQUEST({
            playerId: 'fremen',
            id: 'mockNanoId',
            response: 'decline'
          })
        )
      ).toEqual([])
    })
  })

  test('leaveGame', () => {
    expect(
      allianceRequestsReducer(
        [{ id: 'mockNanoId', requester: 'test', responders: ['someone'] }],
        clientActions.LEAVE_GAME({ playerId: 'test', roomId: 'testRoom' })
      )
    ).toEqual([])
  })
})
