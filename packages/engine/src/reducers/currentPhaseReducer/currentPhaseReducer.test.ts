import { currentPhaseReducer } from '.'
import { clientActions } from '../../actions'

describe('currentPhaseReducer', () => {
  describe('GO_TO_NEXUS', () => {
    it('sets current turn to NEXUS', () => {
      expect(
        currentPhaseReducer(
          'SPICE_BLOW_AND_NEXUS',
          clientActions.GO_TO_NEXUS({ playerId: 'hello' })
        )
      ).toEqual('NEXUS')
    })
  })
})
