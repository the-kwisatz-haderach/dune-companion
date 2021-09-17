import { ReactElement, useMemo } from 'react'
import { useGame, usePlayer } from '../../dune-react'
import CommonPhases from './Common'
import { createRuleFilter } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import {
  commonRuleSets,
  factionRuleSets,
  Factions,
  RuleSection
} from '@dune-companion/engine'
import { Loading } from '../Loading'
import { withTransition } from '../../hocs/withTransition'
import useGameSettingsContext from '../../contexts/GameSettingsContext/GameSettingsContext'
import { CommonActionMenu } from './Common/CommonActionMenu'

const CommonPhaseWithTransition = withTransition(CommonPhases, ({ phase }) => (
  <Loading phase={phase} />
))

function GamePhase(): ReactElement {
  const { showAllFactionRules } = useGameSettingsContext()
  const game = useGame()
  const player = usePlayer()

  const ruleFilter = useMemo(
    () =>
      createRuleFilter({
        game,
        playerFaction: player.faction,
        showAllFactions: showAllFactionRules
      }),
    [game, player.faction, showAllFactionRules]
  )

  const currentPhaseRules: RuleSection[] = [
    ...commonRuleSets[game.currentPhase]?.map(section => ({
      ...section,
      rules: section?.rules?.filter(ruleFilter)
    })),
    {
      title: 'Faction Rules',
      rules: Object.values(game.players)
        .map(player => player.faction)
        .filter((faction): faction is Factions => faction !== null)
        .flatMap(faction => factionRuleSets[faction][game.currentPhase])
        .filter(ruleFilter)
    }
  ]

  if (game.currentPhase === 'FACTION_SELECT') {
    return <FactionSelect />
  }

  return (
    <CommonPhaseWithTransition
      phase={game.currentPhase}
      rules={currentPhaseRules}
      trigger={game.currentPhase}
      ActionMenu={CommonActionMenu}
    />
  )
}

export default GamePhase
