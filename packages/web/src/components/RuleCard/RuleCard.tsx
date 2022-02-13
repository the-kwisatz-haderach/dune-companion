import { factions, RuleSet } from '@dune-companion/engine'
import { Card } from '../Card'

export const RuleCard = ({
  name,
  faction,
  inclusionReason,
  isAdvanced,
  description
}: RuleSet) => {
  return (
    <Card
      title={name}
      meta={
        faction
          ? `${factions[faction].name} rule`
          : inclusionReason
          ? 'Temporary rule'
          : 'Common rule'
      }
      inclusionReason={inclusionReason}
      faction={faction}
      advanced={isAdvanced}
      body={description}
    />
  )
}
