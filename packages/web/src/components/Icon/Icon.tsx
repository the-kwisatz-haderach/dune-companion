import { createStyles, makeStyles, SvgIconTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import SpiceIcon from '@material-ui/icons/MonetizationOn'
import TreacheryCardIcon from '@material-ui/icons/SimCard'

type Props = {
  icon: 'spice' | 'treachery-card' | 'revival' | 'force' | 'city'
}

const icons: Record<
  Props['icon'],
  OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
> = {
  spice: SpiceIcon,
  'treachery-card': TreacheryCardIcon,
  revival: SpiceIcon,
  force: SpiceIcon,
  city: SpiceIcon
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: 'rgb(255 170 40 / 35%)'
    }
  })
)

export const Icon: React.FC<Props> = ({ icon }) => {
  const classes = useStyles()
  const IconElement = icons[icon]
  return <IconElement fontSize="large" className={classes.root} />
}
