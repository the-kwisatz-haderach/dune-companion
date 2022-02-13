import { RuleSection } from '../../models'

export const mentatPauseRules: RuleSection[] = [
  {
    title: 'Determine victory',
    rules: [
      {
        name: 'Victory',
        description:
          'If one player occupies 3 strongholds with at least one of their forces during the Mentat Pause Phase, that player wins the game.',
        isAdvanced: false
      },
      {
        name: 'Alliance Victory',
        description:
          'If the required number of strongholds is 4 and the two players in an Alliance separately occupy a total of at least 4 strongholds with one or more forces at the end of a turn, that Alliance wins the game. For example, if the Atreides are in an Alliance with the Fremen, and the Fremen occupy Sietch Tabr and Carthag and the Atreides occupy Tuek’s Sietch and Arrakeen during the Mentat Pause Phase, they win the game together.',
        isAdvanced: false
      },
      {
        name: 'No Winner(s)',
        description:
          'If there are no winners, players mull over their positions on the board, consider their options and, when they are ready, move the turn marker to the next position on the Turn Track to begin the next turn.',
        isAdvanced: false
      }
    ]
  }
]
