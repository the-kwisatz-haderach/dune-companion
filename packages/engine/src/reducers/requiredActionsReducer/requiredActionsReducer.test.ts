import { requiredActionsReducer } from './requiredActionsReducer'
import { clientActions } from '../../actions'
import { initialGameState } from '../initialGameState'
import { Factions } from '../../models'

describe('requiredActionsReducer', () => {
  test('Invalid action', () => {
    expect(requiredActionsReducer([], { type: 'NONSENSE' } as any)).toEqual([])
  })
  test('CREATE_GAME', () => {
    expect(
      requiredActionsReducer(
        [],
        clientActions.CREATE_GAME({
          playerId: 'test',
          roomId: 'test',
          conditions: initialGameState.conditions
        })
      )
    ).toEqual([
      { playerId: 'test', type: 'UPDATE_PLAYER_NAME' },
      { playerId: 'test', type: 'SELECT_FACTION' },
      { playerId: 'test', type: 'SET_IS_READY' }
    ])
  })
  test('JOIN_GAME', () => {
    expect(
      requiredActionsReducer(
        [],
        clientActions.JOIN_GAME({ playerId: 'test', roomId: 'test' })
      )
    ).toEqual([
      { playerId: 'test', type: 'UPDATE_PLAYER_NAME' },
      { playerId: 'test', type: 'SELECT_FACTION' },
      { playerId: 'test', type: 'SET_IS_READY' }
    ])
  })
  test('LEAVE_GAME', () => {
    expect(
      requiredActionsReducer(
        [{ playerId: 'test', type: 'LEAVE_GAME' }],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([])
  })
  describe('SELECT_FACTION', () => {
    it('removes select faction from required actions', () => {
      expect(
        requiredActionsReducer(
          [{ playerId: 'test', type: 'SELECT_FACTION' }],
          clientActions.SELECT_FACTION({
            playerId: 'test',
            faction: Factions.EMPEROR
          })
        )
      ).toEqual([])
    })
    it('re-adds select faction to required actions if faction is set to null', () => {
      expect(
        requiredActionsReducer(
          [{ playerId: 'test', type: 'SET_IS_READY' }],
          clientActions.SELECT_FACTION({ playerId: 'test', faction: null })
        )
      ).toEqual([
        { playerId: 'test', type: 'SET_IS_READY' },
        { playerId: 'test', type: 'SELECT_FACTION' }
      ])
    })
  })
  test('SET_IS_READY', () => {
    expect(
      requiredActionsReducer(
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
      requiredActionsReducer(
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
      requiredActionsReducer(
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
          requiredActionsReducer(
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
        requiredActionsReducer(
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
