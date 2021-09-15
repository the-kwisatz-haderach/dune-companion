import {
  factions,
  RuleSection as RuleSectionType
} from '@dune-companion/engine'
import { Card } from '../../../components/Card'
import { EmptyState } from '../../../components/EmptyState'
import { MarginList } from '../../../components/MarginList'
import { Section } from '../../../components/Section'

type Props = {
  section: RuleSectionType
}

export const RuleSection = ({ section }: Props) => {
  return (
    <Section heading={section.title} description={section.description}>
      {section?.rules?.length > 0 ? (
        <MarginList>
          {section?.rules.map((rule, index) => (
            <Card
              key={`${rule.name}${index}`}
              title={rule.name}
              meta={
                rule.faction
                  ? `${factions[rule.faction].name} rule`
                  : rule.inclusionReason
                  ? 'Temporary rule'
                  : 'Common rule'
              }
              inclusionReason={rule.inclusionReason}
              faction={rule.faction}
              advanced={rule.isAdvanced}
              body={rule.description}
            />
          ))}
        </MarginList>
      ) : (
        <EmptyState
          title="No faction rules"
          description="There are no faction rules that apply currently."
        />
      )}
    </Section>
  )
}
