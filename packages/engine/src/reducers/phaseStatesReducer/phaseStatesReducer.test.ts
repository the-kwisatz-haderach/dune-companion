import { clientActions } from '../../actions'
import { initialGameState } from '../initialGameState'
import { phaseStatesReducer } from './phaseStatesReducer'

describe('phaseStatesReducer', () => {
  test('MARK_PHASE_STEP_NOT_COMPLETED', () => {
    expect(
      phaseStatesReducer(
        {
          ...initialGameState.phaseStates,
          CHOAM_CHARITY: {
            isChoamCharityDistributed: true
          }
        },
        clientActions.MARK_PHASE_STEP_NOT_COMPLETED({
          playerId: 'test',
          step: 'isChoamCharityDistributed'
        })
      )
    ).toEqual({
      ...initialGameState.phaseStates,
      CHOAM_CHARITY: {
        isChoamCharityDistributed: false
      }
    })
  })
  test('MARK_PHASE_STEP_COMPLETED', () => {
    expect(
      phaseStatesReducer(
        {
          ...initialGameState.phaseStates,
          CHOAM_CHARITY: {
            isChoamCharityDistributed: false
          }
        },
        clientActions.MARK_PHASE_STEP_COMPLETED({
          playerId: 'test',
          step: 'isChoamCharityDistributed'
        })
      )
    ).toEqual({
      ...initialGameState.phaseStates,
      CHOAM_CHARITY: {
        isChoamCharityDistributed: true
      }
    })
  })
})
