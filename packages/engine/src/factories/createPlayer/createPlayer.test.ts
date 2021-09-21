import { createPlayer } from './createPlayer'

describe('createPlayer', () => {
  it('creates an admin player', () => {
    expect(createPlayer('playerId', { isAdmin: true })).toEqual({
      id: 'playerId',
      name: '',
      isAdmin: true,
      faction: null,
      spice: 0,
      treacheryCards: 0,
      hasCompletedPhase: false
    })
  })
  it('creates a player', () => {
    expect(createPlayer('playerId')).toEqual({
      id: 'playerId',
      name: '',
      isAdmin: false,
      faction: null,
      spice: 0,
      treacheryCards: 0,
      hasCompletedPhase: false
    })
  })
})
