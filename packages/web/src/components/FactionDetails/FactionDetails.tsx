import { factions, Factions } from '@dune-companion/engine'
import { FactionAdvantages } from '../../pages/GameRoom/Setup/FactionAdvantages'
import { FactionSummary } from '../../pages/GameRoom/Setup/FactionSummary'
import { Card } from '../Card'
import { EmphasisedText } from '../EmphasisedText'
import { Header } from '../Header'
import { LeaderTeaser } from '../Leader'
import { MarginList } from '../MarginList'
import { RoundedContainer } from '../RoundedContainer'
import { Section } from '../Section'
import dune from '../../images/dune.jpeg'

type Props = {
  factionKey: Factions
  isAdvancedMode: boolean
}

export const FactionDetails: React.FC<Props> = ({
  factionKey,
  isAdvancedMode
}) => {
  const faction = factions[factionKey]
  const commonAdvantages = faction.advantages.filter(
    (rule) => (isAdvancedMode && rule.isAdvanced) || !rule.isAdvanced
  )
  return (
    <RoundedContainer>
      <Header
        type="Commanded by"
        title={faction.commander.name}
        description={faction.commander.backstory}
        faction={factionKey}
        img={dune}
      />
      <Section heading="Strategy" faction={factionKey}>
        <EmphasisedText>{faction.strategy}</EmphasisedText>
      </Section>
      <Section heading="Summary" faction={factionKey}>
        <FactionSummary faction={faction} factionKey={factionKey} />
      </Section>
      <Section heading="Leaders" faction={factionKey}>
        {faction.leaders.map((leader) => (
          <LeaderTeaser
            key={leader.name}
            faction={factionKey}
            name={leader.name}
            imgSrc={dune}
            description={leader.backstory}
            strength={leader.strength}
          />
        ))}
      </Section>
      <Section heading="Phase Advantages" faction={factionKey}>
        <FactionAdvantages
          faction={factionKey}
          isAdvancedMode={isAdvancedMode}
        />
      </Section>
      {commonAdvantages.length > 0 && (
        <Section heading="Common Advantages" faction={factionKey}>
          <MarginList marginTop={3} marginBottom={2}>
            {commonAdvantages.map((rule) => (
              <Card
                key={rule.name}
                title={rule.name}
                meta="Faction rule"
                faction={factionKey}
                advanced={rule.isAdvanced}
                body={rule.description}
              />
            ))}
          </MarginList>
        </Section>
      )}
      {isAdvancedMode && (
        <Section heading="Karama" faction={factionKey}>
          <Card
            title="Karama Power"
            meta="Faction rule"
            faction={factionKey}
            advanced
            body={faction.karamaPower}
          />
        </Section>
      )}
      <Section heading="Alliance Advantages" faction={factionKey}>
        <Card
          title="Alliance Power"
          meta="Faction rule"
          faction={factionKey}
          body={faction.alliancePower}
        />
      </Section>
    </RoundedContainer>
  )
}
