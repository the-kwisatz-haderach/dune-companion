import { memo, ReactElement } from 'react'
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
import { Header } from '../../../components/Header'
import { Alert } from '@material-ui/lab'
import { RuleSection } from './RuleSection'
import { phaseIcons } from '../../../lib/phaseIcons'
import { usePhaseSideEffects } from '../usePhaseSideEffects'

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
  const rules: RuleSectionType[] = filterRules(
    phase,
    ruleFilter,
    playerFactions
  )

  usePhaseSideEffects(phase)

  return (
    <Box bgcolor="white">
      <HeaderImage
        title={phases[phase].name}
        preamble="Phase"
        BackdropImage={phaseIcons[phase]}
      />
      <RoundedContainer>
        {phase === 'SETUP' && (
          <Header
            title="Game Objective"
            description="Each faction has a set of unique economic, military, strategic, or treacherous advantages. The object of the game is to use these advantages to gain control of Dune. The winner is the First Player to occupy at least 3 strongholds with at least one of their forces during the Mentat Pause Phase. A player may win alone or in an Alliance with other players."
          />
        )}
        {phase === 'SETUP' && (
          <Alert severity="info">
            A faction has special advantages that may contradict the rules. A
            faction’s particular advantages always have precedence over the
            rules.
          </Alert>
        )}
        {rules.map((section, index) => (
          <RuleSection key={`${section.title}${index}`} section={section} />
        ))}
      </RoundedContainer>
    </Box>
  )
}

function filterRules(
  phase: Phases,
  ruleFilter: (value: RuleSet) => boolean,
  playerFactions: Factions[]
): RuleSectionType[] {
  return [
    ...commonRuleSets[phase]?.map(section => ({
      ...section,
      rules: section?.rules?.filter(ruleFilter)
    })),
    {
      title: 'Faction Rules',
      rules: playerFactions
        .flatMap(faction => factionRuleSets[faction][phase])
        .filter(ruleFilter)
    }
  ]
}

export default memo(CommonPhases)
