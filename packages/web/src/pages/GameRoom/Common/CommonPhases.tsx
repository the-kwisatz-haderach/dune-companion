import React, { ReactElement } from 'react'
import { Box } from '@material-ui/core'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import { factions, Phases, phases, RuleSection } from '@dune-companion/engine'
import { MarginList } from '../../../components/MarginList'
import { Card } from '../../../components/Card'
import { factionIcons } from '../../../lib/factionIcons'
import { Section } from '../../../components/Section'
import { Header } from '../../../components/Header'
import { Alert } from '@material-ui/lab'

interface Props {
  phase: Phases
  rules: RuleSection[]
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
        BackdropImage={factionIcons.BENE_GESSERIT}
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
          <Section
            key={`${section.title}${index}`}
            heading={section.title}
            description={section.description}
          >
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
          </Section>
        ))}
      </RoundedContainer>
    </Box>
  )
}
