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
  subtitle?: string
  Icon?: ReactElement
}

const useStyles = makeStyles<Theme, {}>(theme =>
  createStyles({
    container: {
      display: 'flex',
      WebkitFontSmoothing: 'antialiased'
    },
    textContainer: {
      marginLeft: theme.spacing(2),
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    img: {
      borderRadius: theme.spacing(1)
    },
    title: {}
  })
)

export default function Header({
  title,
  type,
  img,
  subtitle,
  Icon
}: Props): ReactElement {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      {Icon ? (
        Icon
      ) : img ? (
        <img
          className={classes.img}
          width={80}
          height={80}
          src={img}
          alt={title}
        />
      ) : (
        <></>
      )}
      <Box className={classes.textContainer}>
        {type && <MetaText>{type}</MetaText>}
        <Typography variant="h3">{title}</Typography>
        {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
      </Box>
    </Box>
  )
}
