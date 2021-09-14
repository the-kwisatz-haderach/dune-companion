import { RuleSection } from '../../models'

export const stormRules: RuleSection[] = [
  {
    title: '',
    rules: [
      {
        name: 'First Storm',
        description:
          'The first time the storm is moved, the Storm Marker is placed at a random location along the map edge using the following procedure. The two players whose player circles are nearest on either side of the Storm Start Sector will secretly dial a number from 0 to 20 on the wheels. The two numbers are simultaneously revealed, totaled and the Storm Marker moved from the Storm Start sector counterclockwise around the map for the sum total of sectors.',
        isAdvanced: false,
        inclusionCondition: game => game.currentTurn === 1,
        inclusionReason: 'First turn'
      },
      {
        name: 'Storm Movement',
        description:
          'In all subsequent Storm Phases, the two players who last used the Battle Wheels will independently dial a number from 1 to 3, simultaneously reveal their numbers, add them together, and then advance the Storm Marker from its current position counterclockwise around the map for the sum total of sectors.',
        isAdvanced: false,
        inclusionCondition: game => game.currentTurn > 1
      },
      {
        name: 'Damage',
        description:
          'Any forces in a sector of sand territory (except the Imperial Basin) over which the storm passes or stops are killed. Place these forces in the Tleilaxu Tanks. Forces that are not on a sand territory find protection from the storm. In addition any spice in a sector over which a storm passes or stops is removed to the Spice Bank.',
        isAdvanced: false
      },
      {
        name: 'Obstruction',
        description:
          'Forces may not move into, out of, or through a sector in storm. Forces may not battle if either force is in storm.',
        isAdvanced: false
      },
      {
        name: 'First Player',
        description:
          'The player whose Player Marker the storm next approaches is the First Player in the Bidding Phase, Shipping Phase, and Movement Phase.',
        isAdvanced: false
      }
    ]
  }
]
