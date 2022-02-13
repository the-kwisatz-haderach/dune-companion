import { RuleSection } from '../../models'

export const revivalRules: RuleSection[] = [
  {
    title: 'Forces',
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
    title: 'Leaders',
    rules: [
      {
        name: 'Leader Revival',
        description:
          "If all 5 of a player's leaders are in the Tleilaxu Tanks they may revive 1 leader per turn until all of their leaders have been revived.\nTo revive a leader, a player must pay that leader’s fighting strength in spice to the Spice Bank. A revived leader can be played normally and is still subject to being a traitor.\nIf a revived leader is killed again, place it face down in the Tleilaxu Tanks. This leader cannot be revived again until all of the player’s other revivable leaders have been revived, killed, and sent to the Tleilaxu Tanks again.",
        isAdvanced: false
      }
    ]
  }
]
