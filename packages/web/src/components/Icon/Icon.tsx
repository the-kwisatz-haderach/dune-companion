import { createStyles, makeStyles, Theme } from '@material-ui/core'
import revival from './icons/revival.png'
import spice from './icons/spice.png'
import treacheryCards from './icons/treachery-cards.png'
import city from './icons/city.png'
import forces from './icons/forces.png'

type Props = {
  icon: 'spice' | 'treachery-card' | 'revival' | 'force' | 'city'
  size?: 'medium' | 'small' | 'large'
  alt?: string
}

const icons: Record<Props['icon'], string> = {
  spice: spice,
  'treachery-card': treacheryCards,
  revival: revival,
  force: forces,
  city: city
}

const useStyles = makeStyles<Theme, Pick<Props, 'size'>>(() =>
  createStyles({
    root: {
      color: 'rgb(255 170 40 / 35%)',
      width: ({ size }) => {
        if (size === 'small') return 24
        if (size === 'large') return 56
        return 32
      },
      height: 'auto'
    }
  })
)

export const Icon: React.FC<Props> = ({ icon, size = 'medium', alt }) => {
  const classes = useStyles({ size })
  return <img src={icons[icon]} className={classes.root} alt={alt} />
}
