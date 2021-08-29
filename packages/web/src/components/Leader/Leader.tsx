import { Factions } from '@dune-companion/engine'
import {
  Box,
  Theme,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core'
import { ReactElement } from 'react'

interface Props {
  imgSrc: string
  name: string
  strength: number
  faction: Factions
  description?: string
}

const useStyles = makeStyles<Theme, Pick<Props, 'faction'>>(theme =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center',
      position: 'relative'
    },
    marker: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: 0,
      top: 85,
      padding: theme.spacing(1.2),
      borderRadius: '50%',
      width: 20,
      height: 20,
      boxShadow: theme.shadows[10],
      backgroundImage: ({ faction }) =>
        `linear-gradient(175deg, ${theme.palette[faction].light}, ${theme.palette[faction].dark})`,
      color: ({ faction }) => theme.palette[faction].contrastText
    },
    img: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      marginBottom: theme.spacing(1),
      padding: 12,
      backgroundImage: ({ faction }) =>
        `linear-gradient(175deg, ${theme.palette[faction].main}, ${theme.palette[faction].dark})`
    },
    name: {
      lineHeight: 1.2
    },
    strength: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      WebkitFontSmoothing: 'antialiased'
    }
  })
)

export default function Leader({
  imgSrc,
  name,
  strength,
  description,
  faction
}: Props): ReactElement {
  const classes = useStyles({ faction })
  return (
    <Box className={classes.root}>
      <img className={classes.img} src={imgSrc} alt={name} />
      <Box className={classes.marker}>
        <Typography className={classes.strength}>{strength}</Typography>
      </Box>
      <Typography className={classes.name} variant="h6">
        {name}
      </Typography>
    </Box>
  )
}
