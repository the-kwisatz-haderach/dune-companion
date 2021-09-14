import { Phases, RuleSection } from '../../models'

export const commonRuleSet: Record<Phases, RuleSection[]> = {
  SETUP: [
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
          description:
            '1 card from the Treachery Deck is dealt to each player.',
          isAdvanced: false
        },
        {
          name: 'Turn marker',
          description: 'Place the turn marker at 1 on the Turn Track.',
          isAdvanced: false
        }
      ]
    }
  ],
  STORM: [
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
  ],
  SPICE_BLOW_AND_NEXUS: [
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
  ],
  CHOAM_CHARITY: [],
  BIDDING: [
    {
      title: '',
      rules: [
        {
          name: 'Declaration',
          description:
            'Before bidding starts, all players must declare how many Treachery Cards they hold. The hand limit is 4. Players with 4 cards must pass during bidding.',
          isAdvanced: false
        },
        {
          name: 'Dealer',
          description:
            'One of the players deals cards from the Treachery Deck face down in a row, 1 card for each player who is allowed to bid.',
          isAdvanced: false
        },
        {
          name: 'Auction',
          description:
            'The first card in the row is now auctioned off for spice.\nThe bidding is started by the First Player. If that player already has 4 Treachery Cards the next player to the right who does not have 4 Treachery Cards opens the bidding.\nThe player who bids first must bid 1 or more spice or pass. Bidding then proceeds to the bidder’s immediate right. The next bidder may raise the bid or pass and so on around the table until a top bid is made and all other players pass. The top bidding player then pays the number of spice they bid into the Spice Bank and takes the card.',
          isAdvanced: false
        },
        {
          name: 'Bid Limit',
          description: 'Players may not bid more spice than they have.',
          isAdvanced: false
        },
        {
          name: 'Next Starting Bidder',
          description:
            'In subsequent bidding during this phase, the First Player who can bid, to the right of the player who opened the bid for the previous card, begins the bidding for the next card. In this way every player who can bid gets a chance to open the bidding for a Treachery Card.',
          isAdvanced: false
        },
        {
          name: 'End of Bidding',
          description:
            'Bidding for Treachery Cards continues until all cards available for bid have been auctioned off or a card is not bid on by anyone. If a card is passed on by everyone, all remaining cards are returned to the top of the Treachery Deck and the Bidding Phase is over.',
          isAdvanced: false
        },
        {
          name: 'Transparency',
          description:
            'The number (not the type) of Treachery Cards each player holds must always be open to everyone during the Bidding Phase. No one is allowed to hide the number of cards that they hold. A player can never have more than 4 cards in their hand at any one time. If they have a full hand, they must pass on all cards up for bid.',
          isAdvanced: false
        },
        {
          name: 'Time Limit',
          description:
            'Each player must bid within 10 seconds of the previous player or they are assumed to have passed.',
          isAdvanced: false
        }
      ]
    }
  ],
  REVIVAL: [
    {
      title: 'Force revival',
      rules: [
        {
          name: 'Force Revival',
          description:
            'All players may now revive up to 3 forces from the Tleilaxu Tanks.\nA certain number of forces are revived for free as stated on the player sheet.\nAny additional forces that may be revived must be done at a cost of 2 spice per force. All spice expended for force revival is placed in the Spice Bank.\nA player can never revive more than 3 forces per turn.\nRevived forces must be placed in the player’s reserve.',
          isAdvanced: false
        }
      ]
    },
    {
      title: 'Leader Revival',
      rules: [
        {
          name: 'Leader Revival',
          description:
            'If all 5 of a player’s leaders are in the Tleilaxu Tanks they may revive 1 leader per turn until all of their leaders have been revived.\nTo revive a leader, a player must pay that leader’s fighting strength in spice to the Spice Bank. A revived leader can be played normally and is still subject to being a traitor.\nIf a revived leader is killed again, place it face down in the Tleilaxu Tanks. This leader cannot be revived again until all of the player’s other revivable leaders have been revived, killed, and sent to the Tleilaxu Tanks again.',
          isAdvanced: false
        }
      ]
    }
  ],
  SHIPMENT_AND_MOVEMENT: [
    {
      title: 'Force Shipment',
      rules: [
        {
          name: 'Shipment of Reserves',
          description:
            'A player with off-planet reserves may make one shipment of any number of forces from their reserves to any one territory on the map.',
          isAdvanced: false
        },
        {
          name: 'Payment',
          description:
            'A player must pay spice to the Spice Bank for their shipment. The cost of shipping off-planet reserves is 1 spice per force shipped into any stronghold and 2 spice per force shipped into any other territory.',
          isAdvanced: false
        },
        {
          name: 'Sectors',
          description:
            'When shipping into a territory lying in several sectors, a player must make clear in which sector of the territory they choose to leave their forces.',
          isAdvanced: false
        },
        {
          name: 'Exceptions',
          description:
            'No player may ship into a sector in storm.\nNo player may ship into a stronghold already occupied by two other players.\nNo player may ship forces from the board back to their reserves.',
          isAdvanced: false
        }
      ]
    },
    {
      title: 'Force Movement',
      description:
        'Each player may move, as a group, any number of their forces from one territory into one other territory. Forces are free to move into, out of, or through any territory occupied by any number of forces with certain restrictions and additional movement advantage mentioned below.',
      rules: [
        {
          name: 'Ornithopters',
          description:
            'A player who starts a force move with one or more forces in either Arrakeen, Carthag, or both has access to ornithopters and may move forces through up to three adjacent territories. The forces moved do not have to be in Arrakeen or Carthag to make the three territory move. Thus, for example, a player with one or more forces in Arrakeen would be able to move forces starting in Tuek’s Sietch through Pasty Mesa and Shield Wall to the Imperial Basin, where they must stop.',
          isAdvanced: false
        },
        {
          name: 'One Adjacent Territory',
          description:
            'A player without a force in either Arrakeen or Carthag at the start of their move does not have access to ornithopters and can only move their forces by foot to one adjacent territory.',
          isAdvanced: false
        },
        {
          name: 'One Force Move',
          description: 'Each player may make only one force move per turn.',
          isAdvanced: false
        },
        {
          name: 'Sectors',
          description:
            'Sectors have no effect on movement. Forces can move into or through a territory ignoring all sectors. A sector’s only function is to regulate the movement and coverage of the storm and spice collection.',
          isAdvanced: false
        },
        {
          name: 'Storm',
          description:
            'As defined above in the Storm Phase section, no force may move into, out of, or through a sector in storm. Many territories occupy several sectors, so that a player may move into and out of a territory that is partly in the storm, so long as the group does not pass through the part covered by the storm.\nWhen ending a move in a territory lying in several sectors, a player must make clear in which sector of the territory they choose to leave their forces.\nThe Polar Sink is never in storm.',
          isAdvanced: false
        },
        {
          name: 'Stronghold Blocking',
          description:
            'Like shipment, forces cannot be moved into or through a stronghold if forces of two other players are already there.',
          isAdvanced: false
        }
      ]
    }
  ],
  BATTLE: [
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
  ],
  SPICE_HARVEST: [
    {
      title: '',
      rules: [
        {
          name: 'Collect spice',
          description:
            'Any player with forces in a sector of a territory in which there is spice may now collect that spice. This is done by taking the spice tokens you are entitled to from the territory and placing them behind your shield. The collection rate is 3 spice per force if the player occupies Carthag or Arrakeen. It is 2 spice per force if the player does not occupy Carthag or Arrakeen.\nUncollected spice remains where it is for future turns.',
          isAdvanced: false
        }
      ]
    }
  ],
  MENTAT_PAUSE: [
    {
      title: '',
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
  ],
  FINISHED: []
}
