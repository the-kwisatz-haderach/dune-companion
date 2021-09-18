import { Factions } from '@dune-companion/engine'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { factionIcons } from '../../lib/factionIcons'

const useStyles = makeStyles<Theme, { faction: Factions | null }>(theme =>
  createStyles({
    effect: {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      inset: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1000,
      backgroundColor: ({ faction }) =>
        faction ? theme.palette[faction].light : 'white',
      mixBlendMode: 'multiply',
      animation: '1s ease-in-out $pulse forwards'
    },
    icon: {
      width: '100%',
      height: '100%',
      fill: ({ faction }) =>
        faction ? theme.palette[faction].contrastText : 'black'
    },
    '@keyframes pulse': {
      from: {
        opacity: 0
      },
      '50%': {
        opacity: 1
      },
      to: {
        opacity: 0
      }
    }
  })
)

type Props = {
  faction: Factions | null
  animate?: boolean
}

export const FactionOverlay = ({ faction }: Props) => {
  const classes = useStyles({ faction })
  if (!faction) return <></>
  const FactionIcon = factionIcons[faction]
  return (
    <div className={classes.effect}>
      <FactionIcon className={classes.icon} />
    </div>
  )
}
