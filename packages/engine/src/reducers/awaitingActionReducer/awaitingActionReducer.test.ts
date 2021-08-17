import { awaitingActionReducer } from './awaitingActionReducer'
import { clientActions } from '../../actions'

describe('awaitingActionReducer', () => {
  test('JOIN_GAME', () => {
    expect(
      awaitingActionReducer(
        [],
        clientActions.JOIN_GAME({ playerId: 'test', roomId: 'test' })
      )
    ).toEqual(['test'])
  })
  test('LEAVE_GAME', () => {
    expect(
      awaitingActionReducer(
        ['test'],
        clientActions.LEAVE_GAME({ playerId: 'test' })
      )
    ).toEqual([])
  })
  test('SET_IS_READY', () => {
    expect(
      awaitingActionReducer(
        ['test', 'test2'],
        clientActions.SET_IS_READY({ playerId: 'test' })
      )
    ).toEqual(['test2'])
  })
  test('SET_IS_NOT_READY', () => {
    expect(
      awaitingActionReducer(
        ['test2'],
        clientActions.SET_IS_NOT_READY({ playerId: 'test' })
      )
    ).toEqual(['test2', 'test'])
  })
})
