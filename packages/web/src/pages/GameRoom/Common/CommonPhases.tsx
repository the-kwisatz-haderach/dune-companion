import React, { ReactElement } from 'react'
import { Box } from '@material-ui/core'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import {
  Phases,
  phases,
  RuleSection as RuleSectionType
} from '@dune-companion/engine'
import { Header } from '../../../components/Header'
import { Alert } from '@material-ui/lab'
import { RuleSection } from './RuleSection'
import { phaseIcons } from '../../../lib/phaseIcons'

interface Props {
  phase: Phases
  rules: RuleSectionType[]
  ActionMenu: React.FC
}

export default function CommonPhases({
  phase,
  rules,
  ActionMenu
}: Props): ReactElement {
  return (
    <Box bgcolor="white">
      <ActionMenu />
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
