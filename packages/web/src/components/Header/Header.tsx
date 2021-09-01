import { Factions } from '@dune-companion/engine'
import {
  Box,
  Theme,
  makeStyles,
  Typography,
  createStyles
} from '@material-ui/core'
import { ReactElement } from 'react'
import { MetaText } from '../Typography/MetaText'

interface Props {
  title: string
  type?: string
  img?: string
  description?: string
  Icon?: ReactElement
  faction?: Factions
}

const useStyles = makeStyles<Theme, Pick<Props, 'faction' | 'img'>>(theme =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      WebkitFontSmoothing: 'antialiased',
      marginBottom: theme.spacing(2)
    },
    textContainer: {
      marginLeft: ({ img }) => img && theme.spacing(2.5),
      minHeight: 100,
      flexDirection: 'column',
      display: 'flex',
      alignItems: ({ img }) => (!img ? 'center' : undefined),
      flex: 1,
      justifyContent: 'center',
      '& *': {
        color: 'white'
      }
    },
    topContainer: {
      width: '100%',
      position: 'relative',
      display: 'flex',
      zIndex: 0,
      marginBottom: theme.spacing(2)
    },
    img: {
      borderRadius: '50%',
      padding: 7,
      transition: 'background-color 1s ease-in-out 0.5s',
      backgroundColor: ({ faction }) =>
        faction ? theme.palette[faction].main : theme.palette.grey[300]
    },
    title: {},
    backdrop: {
      position: 'absolute',
      width: '100%',
      top: 0,
      zIndex: -1,
      height: '100%',
      transition: 'background-color 1s ease-in-out 0.5s',
      backgroundColor: ({ faction }) =>
        faction ? theme.palette[faction].main : theme.palette.grey[900],
      borderRadius: 100,
      opacity: 0.6
    }
  })
)

export default function Header({
  title,
  faction,
  type,
  img,
  description,
  Icon
}: Props): ReactElement {
  const classes = useStyles({ faction, img })
  return (
    <Box className={classes.container}>
      <Box className={classes.topContainer}>
        <div className={classes.backdrop} />
        {Icon ? (
          Icon
        ) : img ? (
          <img
            className={classes.img}
            width={100}
            height={100}
            src={img}
            alt={title}
          />
        ) : (
          <></>
        )}
        <Box className={classes.textContainer}>
          {type && <MetaText>{type}</MetaText>}
          <Typography variant="h3">{title}</Typography>
        </Box>
      </Box>
      <Box textAlign="center">
        {description && <Typography variant="body2">{description}</Typography>}
      </Box>
    </Box>
  )
}
