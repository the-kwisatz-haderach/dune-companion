import { initialGameState } from '../..'
import { createFinishedGameState } from './createFinishedGameState'

describe('createFinishedGameState', () => {
  it("returns the game's finished state", () => {
    expect(createFinishedGameState(initialGameState)).toEqual({
      ...initialGameState,
      currentPhase: 'FINISHED'
    })
  })
})
