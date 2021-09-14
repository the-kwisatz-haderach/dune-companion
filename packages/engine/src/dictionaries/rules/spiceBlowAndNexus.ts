import { RuleSection } from '../../models'

export const spiceBlowAndNexusRules: RuleSection[] = [
  {
    title: 'Spice Blow',
    rules: [
      {
        name: 'First Turn',
        description:
          'During the first turns Spice Blow Phase only, all sandworm cards turned over are ignored and set aside, then reshuffled back into the Spice Deck after this phase.',
        isAdvanced: false,
        inclusionCondition: game => game.currentTurn === 1,
        inclusionReason: 'First turn'
      },
      {
        name: 'Territory',
        description:
          'This is a Spice Blow. The amount of spice indicated on the card is taken from the Spice Bank and placed onto the territory in the sector containing the Spice Blow icon. Then this card is placed face up on the Spice Deck discard pile. (If the Spice Blow icon is currently in storm, no spice is placed that turn.)',
        isAdvanced: false
      },
      {
        name: 'Shai-Hulud',
        description:
          'A Nexus will occur after the following events:\nAll spice and forces in the territory shown on the card now face up in the discard pile are removed to the Spice Bank and Tleilaxu Tanks respectively. Then the Shai-Hulud card is placed face up on the Spice Deck discard pile.\nThen another card is turned over. If it is a Shai-Hulud it is immediately discarded and another card is turned over. This continues until a Territory Card appears and spice is placed as defined above. The Territory Card is placed face up on the Spice Deck discard pile.',
        isAdvanced: false
      }
    ]
  },
  {
    title: 'Nexus',
    rules: [
      {
        name: 'Nexus',
        description:
          'Revealing a Shai-Hulud card after the first turn also causes a Nexus at the end of the phase. In a Nexus, Alliances can be formed and broken.',
        isAdvanced: false
      }
    ]
  }
]
