import { ReactElement, useMemo } from 'react'
import { useGame, usePlayer } from '../../dune-react'
import CommonPhases from './Common'
import { createRuleFilter } from './helpers'
import FactionSelect from './Setup/FactionSelect'
import useGameSettingsContext from '../../contexts/GameSettingsContext/GameSettingsContext'
import { useDelayedState } from '../../hooks/useDelayedState'
import { Auction } from './Auction'
import { PhaseLayout } from '../../layouts/PhaseLayout'

function GamePhase(): ReactElement {
  const { showAllFactionRules } = useGameSettingsContext()
  const game = useGame()
  const player = usePlayer()
  const delayedCurrentPhase = useDelayedState(game.currentPhase, 3500)

  const ruleFilter = useMemo(
    () =>
      createRuleFilter({
        currentPhase: game.currentPhase,
        currentTurn: game.currentTurn,
        advancedMode: game.isAdvancedMode,
        playerFaction: player.faction,
        showAllFactions: showAllFactionRules
      }),
    [
      game.currentPhase,
      game.currentTurn,
      game.isAdvancedMode,
      player.faction,
      showAllFactionRules
    ]
  )

  return (
    <PhaseLayout phase={game.currentPhase} delayedPhase={delayedCurrentPhase}>
      {delayedCurrentPhase === 'FACTION_SELECT' ? (
        <FactionSelect />
      ) : delayedCurrentPhase === 'BIDDING' &&
        game.auctions[game.currentTurn - 1] ? (
        <Auction />
      ) : (
        <CommonPhases ruleFilter={ruleFilter} phase={delayedCurrentPhase} />
      )}
    </PhaseLayout>
  )
}

export default GamePhase
