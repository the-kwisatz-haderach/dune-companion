import { ReactElement, useState } from 'react'
import { Box, useTheme } from '@material-ui/core'
import { factions, Factions } from '@dune-companion/engine'
import { useGame, usePlayer } from '../../../dune-react'
import { HeaderImage } from '../../../components/HeaderImage'
import { factionIcons } from '../../../lib/factionIcons'
import { usePhaseSideEffects } from '../usePhaseSideEffects'
import { FactionOverlay } from '../../../components/FactionOverlay'
import { useTransition } from '../../../hooks/useTransition'
import { FactionSelectMenu } from '../Common/FactionSelectMenu'
import { FactionDetails } from '../../../components/FactionDetails'

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
      <FactionDetails
        factionKey={currentFactionKey}
        isAdvancedMode={game.isAdvancedMode}
      />
    </Box>
  )
}
