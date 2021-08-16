import { Box, createStyles, makeStyles, Fab, Zoom } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import { Factions, factions } from '@dune-companion/engine'
import { ReactElement } from 'react'
import { FactionCard } from './FactionCard'

interface Props {
  onSelectFaction: (faction: Factions | null) => void
  selectedFactions: Factions[]
  playerSelection: Factions | null
  onToggleReady: () => void
  isReady: boolean
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2)
      }
    },
    floatingButton: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
)

export default function CharacterSelect({
  onSelectFaction,
  selectedFactions,
  playerSelection,
  onToggleReady,
  isReady
}: Props): ReactElement {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      {Object.entries(factions).map(([factionId, faction]) => (
        <FactionCard
          {...faction}
          key={factionId}
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
      <Zoom in={playerSelection !== null}>
        <Fab
          onClick={onToggleReady}
          variant="extended"
          size="large"
          color={isReady ? 'default' : 'primary'}
          aria-label="ready"
          className={classes.floatingButton}
        >
          {isReady ? (
            <BlockIcon className={classes.extendedIcon} />
          ) : (
            <CheckIcon className={classes.extendedIcon} />
          )}
          {isReady ? 'Not ready' : 'Ready'}
        </Fab>
      </Zoom>
    </Box>
  )
}
