import { RuleSection } from '../../models'

export const nexusRules: RuleSection[] = [
  {
    title: 'Forming an Alliance',
    rules: [
      {
        name: 'Basics',
        description:
          'No more than two players may be in an Alliance and the win condition is now 4 instead of 3 strongholds.',
        isAdvanced: false
      },
      {
        name: 'Discussion',
        description:
          'Players may discuss among themselves the advantages and disadvantages of allying, and with whom.',
        isAdvanced: false
      },
      {
        name: 'Transparency',
        description:
          'The members of the Alliance must be revealed to all. Alliances cannot be secret. Swap Alliance Cards as a reminder of who are in an Alliance.',
        isAdvanced: false
      },
      {
        name: 'Limits',
        description:
          'Several Alliances can be formed during a Nexus, but no player can be a member of more than one Alliance. Once all players have had a chance to ally, no further Alliances can be made until the next Nexus.',
        isAdvanced: false
      }
    ]
  },
  {
    title: 'Breaking an Alliance',
    rules: [
      {
        name: 'Breaking',
        description:
          'Any player may break an Alliance during a Nexus. Players just announce that they are breaking from an Alliance.',
        isAdvanced: false
      },
      {
        name: 'Joining Another',
        description:
          'Players who break from an Alliance have an opportunity to immediately join or form a new Alliance',
        isAdvanced: false
      }
    ]
  },
  {
    title: 'How an Alliance Functions',
    rules: [
      {
        name: 'Winning',
        description:
          "Allied players' forces are considered the same for the purposes of victory. If together their joint forces hold 4 strongholds in the Mentat Pause Phase, they have jointly won the game.",
        isAdvanced: false
      },
      {
        name: 'Constraint',
        description:
          'Allies may not enter any territory (except the Polar Sink) in which one of their allies already has a force and, thus, may never battle one another.',
        isAdvanced: false
      },
      {
        name: 'Ally Secrecy',
        description:
          'Allies may discuss and share strategy and information secretly at any time.',
        isAdvanced: false
      },
      {
        name: 'Bidding',
        description:
          'During the Bidding Phase, allies may help each other by paying some or all of the cost of each other’s Treachery Cards so that a player can bid more spice than they actually have',
        isAdvanced: false
      },
      {
        name: 'Shipment',
        description:
          'During the Shipment & Movement Phase, allies may pay for each other’s shipments.',
        isAdvanced: false
      },
      {
        name: 'Shared Advantages',
        description:
          'Allies may assist one another as specified on their player sheets.',
        isAdvanced: false
      }
    ]
  }
]
