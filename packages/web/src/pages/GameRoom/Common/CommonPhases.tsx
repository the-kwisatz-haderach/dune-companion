import { ReactElement } from 'react'
import { useGame, useGameDispatch, usePlayer } from '../../../dune-react'
import { Box } from '@material-ui/core'
import { ActionMenu } from '../../../components/ActionMenu'
import { HeaderImage } from '../../../components/HeaderImage'
import { RoundedContainer } from '../../../components/RoundedContainer'
import {
  commonRuleSet,
  factionRuleSets,
  factions,
  Factions,
  phases
} from '@dune-companion/engine'
import { MarginList } from '../../../components/MarginList'
import { Card } from '../../../components/Card'
import { factionIcons } from '../../../lib/factionIcons'
import { Section } from '../../../components/Section'

export default function CommonPhases(): ReactElement {
  const dispatch = useGameDispatch()
  const player = usePlayer()
  const game = useGame()

  const isPlayerReady = !player.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const phaseRules = Object.values(game.players)
    .map(player => player.faction)
    .filter((faction): faction is Factions => faction !== null)
    .flatMap(faction => factionRuleSets[faction][game.currentPhase])

  const rules = [
    ...commonRuleSet[game.currentPhase].filter(
      rule => !game.conditions.advancedMode || rule.isAdvanced
    ),
    ...phaseRules
  ].filter(rule => !rule.inclusionCondition || rule.inclusionCondition(game))

  const onToggleReady = () => {
    if (isPlayerReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  return (
    <Box>
      <ActionMenu
        primaryActionLabel={isPlayerReady ? 'Not ready' : 'Ready'}
        primaryActionType={isPlayerReady ? 'negative' : 'positive'}
        onPrimaryAction={onToggleReady}
      />
      <HeaderImage
        title={phases[game.currentPhase].name}
        preamble="Phase"
        BackdropImage={factionIcons.BENE_GESSERIT}
      />
      <RoundedContainer>
        <Section
          heading={`${phases[game.currentPhase].name} Process`}
          description={phases[game.currentPhase].description}
        >
          <MarginList>
            {rules.map(rule => (
              <Card
                title={rule.name}
                meta={
                  rule.faction
                    ? `${factions[rule.faction].name} rule`
                    : rule.inclusionReason
                    ? 'Temporary rule'
                    : 'Common rule'
                }
                phase="SETUP"
                inclusionReason={rule.inclusionReason}
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
