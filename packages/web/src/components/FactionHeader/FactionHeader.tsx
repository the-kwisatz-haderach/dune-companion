import { factions, Factions } from '@dune-companion/engine'
import { Theme, createStyles, makeStyles } from '@material-ui/core'
import { ReactElement } from 'react'
import { getFactionIcon } from '../../lib/getFactionIcon'
import { Header } from '../Header'

interface Props {
  faction: Factions
}

const useStyles = makeStyles<Theme, Props>(theme =>
  createStyles({
    icon: {
      backgroundColor: ({ faction }) => theme.palette[faction].main,
      fill: 'rgb(255 255 255 / 70%)',
      borderRadius: '50%',
      width: 80,
      height: 80
    }
  })
)

export function FactionHeader({ faction }: Props): ReactElement {
  const classes = useStyles({ faction })
  const Icon = getFactionIcon(faction)
  const { name, shorthand } = factions[faction]
  return (
    <Header
      title={name}
      subtitle={shorthand}
      type="Faction"
      Icon={<Icon className={classes.icon} />}
    />
  )
}
