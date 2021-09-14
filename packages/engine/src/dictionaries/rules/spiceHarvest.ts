import { RuleSection } from '../../models'

export const spiceHarvestRules: RuleSection[] = [
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
]
