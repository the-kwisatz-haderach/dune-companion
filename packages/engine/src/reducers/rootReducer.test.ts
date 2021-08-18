import { clientActions } from '../actions'
import { playerFixture } from '../models/__fixtures__'
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
      awaitingActions: [{ playerId: 'test', type: 'SELECT_FACTION' }],
      players: {
        test: {
          ...playerFixture,
          id: 'test',
          isAdmin: true
        }
      }
    })
  })
})
