import {
  factionRuleSets,
  Factions,
  Phases,
  phases
} from '@dune-companion/engine'
import { useMemo } from 'react'
import { Card } from '../../../components/Card'
import { MarginList } from '../../../components/MarginList'
import { Tabs } from '../../../components/Tabs'

type Props = {
  faction: Factions
  isAdvancedMode: boolean
}

export const FactionAdvantages = ({ faction, isAdvancedMode }: Props) => {
  const filteredPhases = useMemo(
    () =>
      Object.keys(phases).filter(
        (phase) =>
          factionRuleSets[faction][phase as Phases].filter(
            (rule) => isAdvancedMode || !rule.isAdvanced
          ).length > 0
      ),
    [isAdvancedMode, faction]
  )
  return (
    <Tabs
      resetDependency={faction}
      sticky
      tabs={filteredPhases.map((phase) => ({
        label: phases[phase as Phases].name,
        content: (
          <MarginList>
            {factionRuleSets[faction][phase as Phases]
              .filter((rule) => isAdvancedMode || !rule.isAdvanced)
              .map((rule) => (
                <Card
                  key={rule.name}
                  title={rule.name}
                  meta="Faction rule"
                  faction={faction}
                  advanced={rule.isAdvanced}
                  body={rule.description}
                />
              ))}
          </MarginList>
        )
      }))}
    />
  )
}
