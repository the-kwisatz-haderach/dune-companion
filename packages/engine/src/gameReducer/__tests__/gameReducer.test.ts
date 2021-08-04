import { gameReducer } from '..'
import { initialGameState } from '../../library/constants'

describe('gameReducer', () => {
  test('invalid action', () => {
    expect(gameReducer(initialGameState, {} as any)).toEqual(initialGameState)
  })
})
