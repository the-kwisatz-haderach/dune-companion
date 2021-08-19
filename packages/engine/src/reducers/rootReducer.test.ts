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
      requiredActions: [
        { playerId: 'test', type: 'UPDATE_PLAYER_NAME' },
        { playerId: 'test', type: 'SELECT_FACTION' },
        { playerId: 'test', type: 'SET_IS_READY' }
      ],
      players: {
        test: {
          ...playerFixture,
          id: 'test',
          isAdmin: false
        }
      }
    })
  })
})
