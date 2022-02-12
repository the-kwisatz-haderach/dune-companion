import { factions, Factions } from '@dune-companion/engine'
import { ActionMenu } from '../../../components/ActionMenu'
import { useGame, useGameDispatch, usePlayer } from '../../../dune-react'

type Props = {
  selectedFactionIndex: number
  onNext: () => void
  onPrev: () => void
}

export const FactionSelectMenu = ({
  onNext,
  onPrev,
  selectedFactionIndex
}: Props) => {
  const factionKeys = Object.keys(factions)
  const selectedFaction = factionKeys[selectedFactionIndex] as Factions
  const { players } = useGame()
  const { id } = usePlayer()
  const dispatch = useGameDispatch()

  const playerSelected = Object.values(players).find(
    (player) => player.faction === selectedFaction
  )

  const isSelectedByPlayer = id === playerSelected?.id

  const onSelectFaction = (faction: Factions) =>
    dispatch('SELECT_FACTION', {
      faction: isSelectedByPlayer ? null : faction
    })

  return (
    <ActionMenu
      primaryActionLabel={isSelectedByPlayer ? 'Deselect' : 'Select'}
      primaryActionType={isSelectedByPlayer ? 'negative' : 'positive'}
      primaryActionPreamble={
        playerSelected
          ? `Selected by ${isSelectedByPlayer ? 'you' : playerSelected.name}`
          : undefined
      }
      primaryActionIsDisabled={playerSelected && !isSelectedByPlayer}
      secondaryActionLeftLabel="Prev"
      onSecondaryActionLeft={onPrev}
      secondaryActionRightLabel="Next"
      onSecondaryActionRight={onNext}
      onPrimaryAction={() =>
        onSelectFaction(factionKeys[selectedFactionIndex] as Factions)
      }
    />
  )
}
