import { RuleSection } from '../../models'

export const setupRules: RuleSection[] = [
  {
    title: 'Setup for play',
    rules: [
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
    ]
  }
]
