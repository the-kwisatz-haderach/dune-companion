import { memo, ReactElement, useMemo } from 'react'
import { Box } from '@material-ui/core'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import {
  commonRuleSets,
  factionRuleSets,
  Factions,
  Phases,
  phases,
  RuleSection as RuleSectionType,
  RuleSet
} from '@dune-companion/engine'
import { Alert } from '@material-ui/lab'
import { RuleSection } from './RuleSection'
import { usePhaseSideEffects } from '../usePhaseSideEffects'
import { phaseIcons } from '../../../lib/phaseIcons'
import { EmphasisedText } from '../../../components/EmphasisedText'
import { Section } from '../../../components/Section'

interface Props {
  phase: Phases
  ruleFilter: (value: RuleSet) => boolean
  playerFactions: Factions[]
}

export function CommonPhases({
  phase,
  ruleFilter,
  playerFactions
}: Props): ReactElement {
  const rules: RuleSectionType[] = filterRules(phase, ruleFilter)

  const factionRules: RuleSectionType = useMemo(
    () => ({
      title: 'Faction Rules',
      rules: playerFactions
        .flatMap((faction) => factionRuleSets[faction][phase])
        .filter(ruleFilter)
    }),
    [playerFactions, phase, ruleFilter]
  )

  usePhaseSideEffects(phase)

  return (
    <Box bgcolor="white">
      <HeaderImage
        size="small"
        title={phases[phase].name}
        preamble="Phase"
        BackdropIcon={phaseIcons[phase]}
      />
      <RoundedContainer>
        {phase === 'SETUP' && (
          <Section heading="Game objective">
            <EmphasisedText>
              Each faction has a set of unique economic, military, strategic, or
              treacherous advantages. The object of the game is to use these
              advantages to gain control of Dune. The winner is the First Player
              to occupy at least 3 strongholds with at least one of their forces
              during the Mentat Pause Phase. A player may win alone or in an
              Alliance with other players.
            </EmphasisedText>
            <Alert severity="info" style={{ marginBottom: 24 }}>
              A faction has special advantages that may contradict the rules. A
              faction's particular advantages always have precedence over the
              rules.
            </Alert>
          </Section>
        )}
        {rules.map((section, index) => (
          <RuleSection key={`${section.title}${index}`} section={section} />
        ))}
        <RuleSection section={factionRules} />
      </RoundedContainer>
    </Box>
  )
}

function filterRules(
  phase: Phases,
  ruleFilter: (value: RuleSet) => boolean
): RuleSectionType[] {
  return [
    ...commonRuleSets[phase]?.map((section) => ({
      ...section,
      rules: section?.rules?.filter(ruleFilter)
    }))
  ]
}

export default memo(CommonPhases)
