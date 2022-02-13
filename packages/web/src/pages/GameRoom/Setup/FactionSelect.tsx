import { ReactElement, useState } from 'react'
import { Box, useTheme } from '@material-ui/core'
import { factions, Factions } from '@dune-companion/engine'
import { useGame, usePlayer } from '../../../dune-react'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import { Card } from '../../../components/Card'
import { Section } from '../../../components/Section'
import { factionIcons } from '../../../lib/factionIcons'
import { Header } from '../../../components/Header'
import { LeaderTeaser } from '../../../components/Leader'
import { FactionSummary } from './FactionSummary'
import { FactionAdvantages } from './FactionAdvantages'
import dune from '../../../images/dune.jpeg'
import { usePhaseSideEffects } from '../usePhaseSideEffects'
import { FactionOverlay } from '../../../components/FactionOverlay'
import { useTransition } from '../../../hooks/useTransition'
import { FactionSelectMenu } from '../Common/FactionSelectMenu'
import { EmphasisedText } from '../../../components/EmphasisedText'
import { MarginList } from '../../../components/MarginList'

export default function FactionSelect(): ReactElement {
  const { palette } = useTheme()
  const [factionIndex, setFactionIndex] = useState(0)
  const factionKeys = Object.keys(factions)
  const currentFactionKey = factionKeys[factionIndex] as Factions
  const game = useGame()
  const player = usePlayer()
  const showEffect = useTransition(player.faction, {
    duration: 1000,
    condition: player.faction !== null
  })
  usePhaseSideEffects('FACTION_SELECT')

  const currentFaction = factions[currentFactionKey]

  const commonAdvantages = currentFaction.advantages.filter(
    (rule) => (game.isAdvancedMode && rule.isAdvanced) || !rule.isAdvanced
  )

  const onNext = () => {
    setFactionIndex((curr) => (curr + 1) % factionKeys.length)
  }

  const onPrev = () => {
    setFactionIndex((curr) => {
      const prev = curr - 1
      if (prev < 0) {
        return factionKeys.length - 1
      }
      return prev
    })
  }

  return (
    <Box>
      {showEffect && <FactionOverlay faction={currentFactionKey} />}
      <FactionSelectMenu
        onNext={onNext}
        onPrev={onPrev}
        selectedFactionIndex={factionIndex}
      />
      <HeaderImage
        title={currentFaction.name}
        preamble="Faction"
        subtitle={currentFaction.keyAdvantage}
        BackdropIcon={factionIcons[currentFactionKey]}
        color={palette[currentFactionKey].dark}
        glow={palette[currentFactionKey].light}
      />
      <RoundedContainer>
        <Header
          type="Commanded by"
          title={currentFaction.commander.name}
          description={currentFaction.commander.backstory}
          faction={currentFactionKey}
          img={dune}
        />
        <Section heading="Strategy" faction={currentFactionKey}>
          <EmphasisedText>{currentFaction.strategy}</EmphasisedText>
        </Section>
        <Section heading="Summary" faction={currentFactionKey}>
          <FactionSummary
            faction={currentFaction}
            factionKey={currentFactionKey}
          />
        </Section>
        <Section heading="Leaders" faction={currentFactionKey}>
          {currentFaction.leaders.map((leader) => (
            <LeaderTeaser
              key={leader.name}
              faction={currentFactionKey}
              name={leader.name}
              imgSrc={dune}
              description={leader.backstory}
              strength={leader.strength}
            />
          ))}
        </Section>
        <Section heading="Phase Advantages" faction={currentFactionKey}>
          <FactionAdvantages
            faction={currentFactionKey}
            isAdvancedMode={game.isAdvancedMode}
          />
        </Section>
        {commonAdvantages.length > 0 && (
          <Section heading="Common Advantages" faction={currentFactionKey}>
            <MarginList marginTop={3} marginBottom={2}>
              {commonAdvantages.map((rule) => (
                <Card
                  key={rule.name}
                  title={rule.name}
                  meta="Faction rule"
                  faction={currentFactionKey}
                  advanced={rule.isAdvanced}
                  body={rule.description}
                />
              ))}
            </MarginList>
          </Section>
        )}
        {game.isAdvancedMode && (
          <Section heading="Karama" faction={currentFactionKey}>
            <Card
              title="Karama Power"
              meta="Faction rule"
              faction={currentFactionKey}
              advanced
              body={currentFaction.karamaPower}
            />
          </Section>
        )}
        <Section heading="Alliance Advantages" faction={currentFactionKey}>
          <Card
            title="Alliance Power"
            meta="Faction rule"
            faction={currentFactionKey}
            body={currentFaction.alliancePower}
          />
        </Section>
      </RoundedContainer>
    </Box>
  )
}
