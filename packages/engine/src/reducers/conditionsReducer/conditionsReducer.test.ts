import { conditionsReducer } from './conditionsReducer'
import { clientActions } from '../../actions'
import { initialGameState } from '../../constants'

describe('conditionsReducer', () => {
  test('createGame', () => {
    expect(
      conditionsReducer(
        initialGameState.conditions,
        clientActions.CREATE_GAME({
          playerId: 'test',
          roomId: 'someId',
          conditions: {
            maxPlayers: 4,
            maxTurns: 5,
            advancedMode: true
          }
        })
      )
    ).toEqual({
      maxPlayers: 4,
      maxTurns: 5,
      advancedMode: true
    })
  })
})
