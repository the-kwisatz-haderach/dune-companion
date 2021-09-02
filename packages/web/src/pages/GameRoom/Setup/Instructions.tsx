import { ReactElement } from 'react'
import { useGame } from '../../../dune-react'
import { Box } from '@material-ui/core'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import {
  commonRuleSet,
  factionRuleSets,
  factions,
  Factions
} from '@dune-companion/engine'
import { MarginList } from '../../../components/MarginList'
import { Card } from '../../../components/Card'
import { factionIcons } from '../../../lib/factionIcons'
import { Header } from '../../../components/Header'
import { Section } from '../../../components/Section'
import { Alert } from '@material-ui/lab'

export default function Instructions(): ReactElement {
  const game = useGame()

  const phaseRules = Object.values(game.players)
    .map(player => player.faction)
    .filter((faction): faction is Factions => faction !== null)
    .flatMap(faction => factionRuleSets[faction].SETUP)

  const rules = [
    ...commonRuleSet.SETUP.filter(
      rule => !game.conditions.advancedMode || rule.isAdvanced
    ),
    ...phaseRules
  ]

  return (
    <Box>
      <HeaderImage
        title="Setup for play"
        preamble="Phase"
        BackdropImage={factionIcons.BENE_GESSERIT}
      />
      <RoundedContainer>
        <Header
          title="Game Objective"
          description="Each faction has a set of unique economic, military, strategic, or treacherous advantages. The object of the game is to use these advantages to gain control of Dune. The winner is the First Player to occupy at least 3 strongholds with at least one of their forces during the Mentat Pause Phase. A player may win alone or in an Alliance with other players."
        />
        <Section
          heading="Setup Process"
          description="Players take their Player Shields and player sheets and set up their factions as follows."
        >
          <Alert severity="info">
            A faction has special advantages that may contradict the rules. A
            faction’s particular advantages always have precedence over the
            rules.
          </Alert>
          <MarginList>
            {rules.map(rule => (
              <Card
                title={rule.name}
                meta={
                  rule.faction
                    ? `${factions[rule.faction].name} rule`
                    : 'Common rule'
                }
                phase="SETUP"
                faction={rule.faction}
                advanced={rule.isAdvanced}
                body={rule.description}
              />
            ))}
          </MarginList>
        </Section>
      </RoundedContainer>
    </Box>
  )
}
