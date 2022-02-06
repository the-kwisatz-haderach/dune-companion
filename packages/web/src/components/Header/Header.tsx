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

const useStyles = makeStyles<Theme, Pick<Props, 'faction' | 'img'>>((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    textContainer: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      WebkitFontSmoothing: 'antialiased',
      borderRadius: 24,
      flexDirection: 'column',
      display: 'flex',
      alignItems: ({ img }) => (!img ? 'center' : undefined),
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      transition: 'background-color 1s ease-in-out 0.5s',
      position: 'relative',
      bottom: ({ faction }) => (faction ? 24 : 0),
      marginBottom: theme.spacing(2),
      backgroundColor: ({ faction }) =>
        faction ? theme.palette[faction].main : theme.palette.grey[700],
      '& > *': {
        color: 'white'
      }
    },
    img: {
      borderRadius: '50%',
      padding: 7,
      zIndex: 1,
      transition: 'background-color 1s ease-in-out 0.5s',
      backgroundColor: ({ faction }) =>
        faction ? theme.palette[faction].main : theme.palette.grey[300]
    },
    description: {
      color: 'white',
      fontSize: theme.typography.pxToRem(12),
      marginTop: theme.spacing(1)
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
        {description && (
          <Typography className={classes.description} variant="body2">
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
