import { Box, createStyles, makeStyles } from '@material-ui/core'
import { Factions, factions } from '@dune-companion/engine'
import { ReactElement } from 'react'
import { FactionCard } from './FactionCard'

interface Props {
  onSelectFaction: (faction: Factions | null) => void
  selectedFactions: Factions[]
  playerSelection: Factions | null
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2)
      }
    }
  })
)

export default function CharacterSelect({
  onSelectFaction,
  selectedFactions,
  playerSelection
}: Props): ReactElement {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      {Object.entries(factions).map(([factionId, faction]) => (
        <FactionCard
          {...faction}
          isSelected={playerSelection === factionId}
          disabled={
            playerSelection !== factionId &&
            selectedFactions.includes(factionId as Factions)
          }
          onSelectFaction={() =>
            playerSelection === factionId
              ? onSelectFaction(null)
              : onSelectFaction(factionId as Factions)
          }
        />
      ))}
    </Box>
  )
}
