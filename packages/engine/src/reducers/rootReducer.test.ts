import { clientActions } from '../actions'
import { createPlayer } from '../factories'
import { initialGameState } from './initialGameState'
import { rootReducer } from './rootReducer'

describe('rootReducer', () => {
  it('works', () => {
    expect(
      rootReducer(
        initialGameState,
        clientActions.JOIN_GAME({ playerId: 'test', roomId: 'test' })
      )
    ).toEqual({
      ...initialGameState,
      players: {
        test: createPlayer('test')
      }
    })
  })
})
