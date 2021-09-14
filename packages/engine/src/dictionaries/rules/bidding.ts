import { RuleSection } from '../../models'

export const biddingRules: RuleSection[] = [
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
]
