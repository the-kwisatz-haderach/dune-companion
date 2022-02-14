import {
  commonRuleSets,
  Phases,
  RuleSection,
  RuleSet
} from '@dune-companion/engine'

export function filterRules(
  phase: Phases,
  ruleFilter: (value: RuleSet) => boolean
): RuleSection[] {
  return [
    ...commonRuleSets[phase]?.map((section) => ({
      ...section,
      rules: section?.rules?.filter(ruleFilter)
    }))
  ]
}
