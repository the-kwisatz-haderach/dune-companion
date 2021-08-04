import { engineActions } from '../../actions'
import { gameReducer } from '../'
import { phases } from '../../library/constants'
import { initialGameState } from '../../library/constants/initialGameState'

describe('engineActions', () => {
  test('incrementPhase', () => {
    expect(
      gameReducer(initialGameState, engineActions.INCREMENT_PHASE())
    ).toEqual({
      ...initialGameState,
      currentPhase: 1
    })
  })
  test('incrementPhase past last phase', () => {
    const lastPhaseIndex = Object.keys(phases).length - 1
    expect(
      gameReducer(
        { ...initialGameState, currentPhase: lastPhaseIndex },
        engineActions.INCREMENT_PHASE()
      )
    ).toEqual({
      ...initialGameState,
      currentPhase: 0
    })
  })
  test('incrementTurn', () => {
    expect(
      gameReducer(
        { ...initialGameState, currentPhase: 4 },
        engineActions.INCREMENT_TURN()
      )
    ).toEqual({
      ...initialGameState,
      currentTurn: 1,
      currentPhase: 0
    })
  })
})
