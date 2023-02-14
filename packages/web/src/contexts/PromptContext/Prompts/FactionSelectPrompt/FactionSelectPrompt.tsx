import { ReactElement, useCallback, useMemo, useState } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { Factions, factions } from '@dune-companion/engine'
import { PromptProps } from '../../types'
import { useGame, useGameDispatch } from '../../../../dune-react'
import { SimplePrompt } from '../SimplePrompt'

export function FactionSelectPrompt({
  closePrompt,
  open
}: PromptProps): ReactElement {
  const dispatch = useGameDispatch()
  const game = useGame()
  const [selectedFaction, setSelectedFaction] = useState('')

  const onSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFaction(e.target.value)
  }, [])

  const selectedFactions = useMemo(
    () =>
      Object.values(game.players)
        .map((player) => player.faction)
        .filter(Boolean),
    [game.players]
  )
  return (
    <SimplePrompt
      open={open}
      title="Select faction"
      closable={false}
      closePrompt={closePrompt}
      primaryAction={{
        label: 'Select',
        onClick: () => {
          dispatch('SELECT_FACTION', { faction: selectedFaction as Factions })
          closePrompt()
        },
        disabled: !selectedFaction
      }}
    >
      <RadioGroup value={selectedFaction} onChange={onSelect}>
        {Object.entries(factions).map(([faction, { name }]) => (
          <FormControlLabel
            disabled={selectedFactions.includes(faction as Factions)}
            value={faction}
            label={name}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </SimplePrompt>
  )
}
