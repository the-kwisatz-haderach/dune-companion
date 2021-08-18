import { awaitingActionReducer } from './awaitingActionReducer'
import { clientActions } from '../../actions'

describe('awaitingActionReducer', () => {
  test('JOIN_GAME', () => {
    expect(
      awaitingActionReducer(
        [],
        clientActions.JOIN_GAME({ playerId: 'test', roomId: 'test' })
      )
    ).toEqual([{ playerId: 'test', type: 'SELECT_FACTION' }])
  })
  test('LEAVE_GAME', () => {
    expect(
      awaitingActionReducer(
        [{ playerId: 'test', type: 'LEAVE_GAME' }],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([])
  })
  test('SET_IS_READY', () => {
    expect(
      awaitingActionReducer(
        [
          { playerId: 'test', type: 'SET_IS_READY' },
          { playerId: 'test2', type: 'SET_IS_READY' }
        ],
        clientActions.SET_IS_READY({ playerId: 'test' })
      )
    ).toEqual([{ playerId: 'test2', type: 'SET_IS_READY' }])
  })
  test('SET_IS_NOT_READY', () => {
    expect(
      awaitingActionReducer(
        [{ playerId: 'test2', type: 'SET_IS_READY' }],
        clientActions.SET_IS_NOT_READY({ playerId: 'test' })
      )
    ).toEqual([
      { playerId: 'test2', type: 'SET_IS_READY' },
      { playerId: 'test', type: 'SET_IS_READY' }
    ])
  })
  test('REQUEST_ALLIANCE', () => {
    expect(
      awaitingActionReducer(
        [],
        clientActions.REQUEST_ALLIANCE({
          playerId: 'somePlayer',
          requester: 'somePlayer',
          responders: ['anotherPlayer', 'yetAnotherPlayer']
        })
      )
    ).toEqual([
      {
        playerId: 'anotherPlayer',
        type: 'RESPOND_TO_ALLIANCE_REQUEST',
        relatedPlayers: ['anotherPlayer', 'yetAnotherPlayer']
      },
      {
        playerId: 'yetAnotherPlayer',
        type: 'RESPOND_TO_ALLIANCE_REQUEST',
        relatedPlayers: ['anotherPlayer', 'yetAnotherPlayer']
      }
    ])
  })
  describe('RESPOND_TO_ALLIANCE_REQUEST', () => {
    describe('when one player accepts', () => {
      it('still requires the other player to respond', () => {
        expect(
          awaitingActionReducer(
            [
              {
                playerId: 'anotherPlayer',
                type: 'RESPOND_TO_ALLIANCE_REQUEST',
                relatedPlayers: ['anotherPlayer', 'yetAnotherPlayer']
              },
              {
                playerId: 'yetAnotherPlayer',
                type: 'RESPOND_TO_ALLIANCE_REQUEST',
                relatedPlayers: ['anotherPlayer', 'yetAnotherPlayer']
              }
            ],
            clientActions.RESPOND_TO_ALLIANCE_REQUEST({
              playerId: 'yetAnotherPlayer',
              response: 'accept'
            })
          )
        ).toEqual([
          {
            playerId: 'anotherPlayer',
            type: 'RESPOND_TO_ALLIANCE_REQUEST',
            relatedPlayers: ['anotherPlayer', 'yetAnotherPlayer']
          }
        ])
      })
    })
  })
  describe('when one player declines', () => {
    it('removes all awaiting actions related to the original alliance request', () => {
      expect(
        awaitingActionReducer(
          [
            {
              playerId: 'anotherPlayer',
              type: 'RESPOND_TO_ALLIANCE_REQUEST',
              relatedPlayers: ['anotherPlayer', 'yetAnotherPlayer']
            },
            {
              playerId: 'yetAnotherPlayer',
              type: 'RESPOND_TO_ALLIANCE_REQUEST',
              relatedPlayers: ['anotherPlayer', 'yetAnotherPlayer']
            }
          ],
          clientActions.RESPOND_TO_ALLIANCE_REQUEST({
            playerId: 'yetAnotherPlayer',
            response: 'decline'
          })
        )
      ).toEqual([])
    })
  })
})
