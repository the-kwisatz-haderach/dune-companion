import { Box, createStyles, makeStyles, Fab, Zoom } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'
import { Factions, factions } from '@dune-companion/engine'
import { ReactElement } from 'react'
import { FactionCard } from './FactionCard'
import { useGame, useGameDispatch, usePlayer } from '../../../dune-react'

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

export default function CharacterSelect(): ReactElement {
  const classes = useStyles()
  const dispatch = useGameDispatch()
  const game = useGame()
  const player = usePlayer()

  const selectedFactions = Object.values(game.players)
    .map(player => player.faction)
    .filter(Boolean) as Factions[]

  const isPlayerReady = !player.actions.some(
    action => action.type === 'SET_IS_READY'
  )

  const onToggleReady = () => {
    if (isPlayerReady) {
      return dispatch('SET_IS_NOT_READY', {})
    }
    dispatch('SET_IS_READY', {})
  }

  const onSelectFaction = (faction: Factions | null) => {
    dispatch('SELECT_FACTION', {
      faction
    })
  }

  return (
    <Box className={classes.container}>
      {Object.entries(factions).map(([factionId, faction]) => (
        <FactionCard
          {...faction}
          key={factionId}
          isSelected={player.faction === factionId}
          disabled={
            player.faction !== factionId &&
            selectedFactions.includes(factionId as Factions)
          }
          onSelectFaction={() =>
            player.faction === factionId
              ? onSelectFaction(null)
              : onSelectFaction(factionId as Factions)
          }
        />
      ))}
      <Zoom in={player.faction !== null}>
        <Fab
          onClick={onToggleReady}
          variant="extended"
          size="large"
          color={isPlayerReady ? 'default' : 'primary'}
          aria-label="ready"
          className={classes.floatingButton}
        >
          {isPlayerReady ? (
            <BlockIcon className={classes.extendedIcon} />
          ) : (
            <CheckIcon className={classes.extendedIcon} />
          )}
          {isPlayerReady ? 'Not ready' : 'Ready'}
        </Fab>
      </Zoom>
    </Box>
  )
}
