import { RuleSection } from '../../models'

export const battleRules: RuleSection[] = [
  {
    title: 'Battle Determination',
    description:
      'Wherever two or more players’ forces occupy the same territory, battles must occur between those players.\nBattles continue until just one player’s forces or no forces remain in all territories on the map with two exceptions:\nPlayers cannot battle one another in a territory if their forces are separated by a sector in storm. Their forces can remain in the same territory at the end of the phase.\nPlayers cannot battle in the Polar Sink. It is a free haven for everyone.',
    rules: [
      {
        name: 'First Player',
        description:
          'When resolving battles, the First Player is named the aggressor until all of their battles, if any, have been fought. The aggressor chooses the order in which they wish to fight their battles. Then the player to their immediate right becomes the aggressor and so on, until all battles are resolved.\nIf three or more players are in the same territory, the aggressor picks who they will battle first, second, etc. for as long as they survive.',
        isAdvanced: false
      }
    ]
  },
  {
    title: 'Battle Plan',
    description:
      'To resolve a battle, each player must secretly formulate a Battle Plan. A Battle Plan always includes the number of forces dialed on the Battle Wheel. If possible, it must include a faction’s leader or cheap hero. It may include Treachery Cards at the player’s discretion.',
    rules: [
      {
        name: 'Battle Wheel',
        description:
          'Each player picks up a Battle Wheel and secretly dials a number from zero to the number of forces they have in the disputed territory. Both players will lose the number of forces dialed on the Battle Wheel.',
        isAdvanced: false
      },
      {
        name: 'Leaders',
        description:
          'One Leader Disc is selected and placed face up in the slot on the wheel. A Cheap Hero Card may be played in lieu of a Leader Disc.\nLeaders that survive battles may fight more than once in a single territory if needed, but no leader may fight in more than one territory during the same phase.\nA player must always play either a leader or a cheap hero card as part of their Battle Plan if possible.\nIf it is not possible, they must announce that fact.\nWhen a player plays a cheap hero, their total is simply the number of tokens on the dial, but the option to play weapon, defense, or worthless cards is still available to them.',
        isAdvanced: false
      },
      {
        name: 'No Treachery',
        description:
          'A player with no leader or cheap hero must still battle, but they cannot play any Treachery Cards as part of their Battle Plan. (This situation can occur when a player does not have a cheap hero and all their leaders are in the Tleilaxu Tanks or have fought in another territory in that phase.)',
        isAdvanced: false,
        inclusionReason: 'No leader'
      },
      {
        name: 'Treachery Cards',
        description:
          'Players with a leader or cheap hero may play a Weapon Treachery Card, Defense Treachery Card, or both by holding them against the wheel. They may play no Treachery Cards as well.',
        isAdvanced: false
      },
      {
        name: 'Revealing Wheels',
        description:
          'When both players are ready, the Battle Plans are revealed simultaneously.',
        isAdvanced: false
      }
    ]
  },
  {
    title: 'Battle Resolution',
    rules: [
      {
        name: 'Winner',
        description:
          'The winner is the player with the higher total of number dialed on the Battle Wheel, plus their leader’s fighting strength.',
        isAdvanced: false
      },
      {
        name: 'No Ties',
        description: 'In the case of a tie, the aggressor has won.',
        isAdvanced: false
      },
      {
        name: 'Weapons',
        description:
          'If a player’s opponent played a Weapon Treachery Card and the player did not play the proper Defense Treachery Card, the player’s leader is killed and cannot count toward their total. Both leaders can be killed and neither count in the battle. When a player plays a cheap hero, their total is simply the number of forces they dial, but they can play weapons or other Treachery Cards.',
        isAdvanced: false
      },
      {
        name: 'Killed Leaders',
        description:
          'Any leaders killed are immediately placed face up in the Tleilaxu Tanks. The winner immediately receives their value (including their own leader, if killed) in spice from the Spice Bank.',
        isAdvanced: false
      },
      {
        name: 'Surviving Leaders',
        description:
          'Leaders who survive remain in the territory where they were used until all battles in other territories have been resolved. Then they are retrieved by their owners.',
        isAdvanced: false
      },
      {
        name: 'Losing',
        description:
          'The losing player loses all the forces they had in the territory to the Tleilaxu Tanks and must discard every Treachery Card they used in their Battle Plan. Note that the loser does not lose their leader as a result of battle. Leaders are killed only by Weapon Treachery Cards.',
        isAdvanced: false
      },
      {
        name: 'Winning',
        description:
          'The winning player loses only the number of forces they dialed on the Battle Wheel. These forces are placed in the Tleilaxu Tanks. The winning player may also keep or discard any of the cards they played.',
        isAdvanced: false
      }
    ]
  },
  {
    title: 'Traitors',
    description: 'The Traitor Card is revealed.',
    rules: [
      {
        name: 'The Player Who Revealed the Traitor Card',
        description:
          '\n- immediately wins the battle\n- loses nothing, regardless of what was played in the Battle Plans (even if a lasgun and shield are revealed)\n- places the traitorous leader in the Tleilaxu Tanks and receives the traitorous leader’s fighting strength in spice from the Spice Bank.',
        isAdvanced: false,
        inclusionReason: 'Traitor played'
      },
      {
        name: 'The Player Whose Traitor Was Revealed',
        description:
          '-loses all of their forces in the territory\n- discards all of the cards they played',
        isAdvanced: false,
        inclusionReason: 'Traitor played'
      },
      {
        name: 'Two Traitors',
        description:
          'If both leaders are traitors, each a traitor for the opponent, both players’ forces in the territory, their cards played, and their leaders, are lost. Neither player gets any spice.',
        isAdvanced: false,
        inclusionReason: 'Traitor played'
      }
    ]
  }
]
