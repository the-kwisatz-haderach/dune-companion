import { RuleSection as RuleSectionType } from '@dune-companion/engine'
import { RuleCard } from '../../../components/RuleCard'
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
            <RuleCard key={`${rule.name}${index}`} {...rule} />
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
