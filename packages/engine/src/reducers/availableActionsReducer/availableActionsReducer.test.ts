import { availableActionsReducer } from '.'
import { Factions } from '../../models'
import { playerFixture } from '../../models/__fixtures__'
import { initialGameState } from '../initialGameState'

describe('availableActionsReducer', () => {
  test('initial actions', () => {
    expect(availableActionsReducer(initialGameState)).toEqual({})
  })

  describe('before starting the game (turn = 0)', () => {
    test('before selecting a faction', () => {
      expect(
        availableActionsReducer({
          ...initialGameState,
          players: {
            somePlayer: {
              ...playerFixture,
              faction: null
            }
          }
        })
      ).toEqual({
        somePlayer: {
          primary: [],
          secondary: []
        }
      })
    })
    test('after selecting a faction', () => {
      expect(
        availableActionsReducer({
          ...initialGameState,
          players: {
            somePlayer: {
              ...playerFixture,
              faction: Factions.FREMEN
            }
          }
        })
      ).toEqual({
        somePlayer: {
          primary: [],
          secondary: []
        }
      })
    })

    describe('when player is admin', () => {
      test('before selecting a faction', () => {
        expect(
          availableActionsReducer({
            ...initialGameState,
            players: {
              somePlayer: {
                ...playerFixture,
                faction: null
              }
            }
          })
        ).toEqual({
          somePlayer: {
            primary: [],
            secondary: []
          }
        })
      })
      test.todo('after selecting a faction')
    })
  })
})
