import { Phases } from '../../models'
import { RuleSet } from '../../models/ruleSet'

export const commonRuleSet: Record<Phases, RuleSet[]> = {
  SETUP: [
    {
      name: 'Positions',
      description:
        'Players place their Player Marker on the player circle closest to their shield and seat at the table.',
      isAdvanced: false
    },
    {
      name: 'Traitors',
      description:
        'Remove the cards for all factions that are not in play from the Traitor Deck. Then shuffle the cards thoroughly. Each player is dealt 4 cards Each player then secretly selects 1 card to keep. If a player draws any leaders from an opponent’s faction, they can choose 1 leader to become their traitor. If they drew no opponent leaders, they can protect one of their own leaders. Either way, each player places their chosen card face down behind their shield, returning the other cards face down to the bottom of the Traitor Deck.',
      isAdvanced: false
    },
    {
      name: 'Spice',
      description:
        'Spice equal to the amount indicated on each player sheet is removed from the Spice Bank and placed behind each shield.',
      isAdvanced: false
    },
    {
      name: 'Forces',
      description:
        'Each player’s forces are placed on the board as indicated by their player sheet. All forces in reserve are placed next to your shield.',
      isAdvanced: false
    },
    {
      name: 'Treachery',
      description: '1 card from the Treachery Deck is dealt to each player.',
      isAdvanced: false
    },
    {
      name: 'Turn marker',
      description: 'Place the turn marker at 1 on the Turn Track.',
      isAdvanced: false
    }
  ],
  STORM: [
    {
      name: 'First Storm',
      description:
        'The first time the storm is moved, the Storm Marker is placed at a random location along the map edge using the following procedure. The two players whose player circles are nearest on either side of the Storm Start Sector will secretly dial a number from 0 to 20 on the wheels. The two numbers are simultaneously revealed, totaled and the Storm Marker moved from the Storm Start sector counterclockwise around the map for the sum total of sectors.',
      isAdvanced: false,
      inclusionCondition: game => game.currentTurn === 1
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
  ],
  SPICE_BLOW_AND_NEXUS: [],
  CHOAM_CHARITY: [],
  BIDDING: [],
  REVIVAL: [],
  SHIPMENT_AND_MOVEMENT: [],
  BATTLE: [],
  SPICE_HARVEST: [],
  MENTAT_PAUSE: [],
  FINISHED: []
}
