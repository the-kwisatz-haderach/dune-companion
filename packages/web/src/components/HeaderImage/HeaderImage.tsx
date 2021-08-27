import { ReactElement } from 'react'
import {
  Theme,
  Box,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core'

interface Props {
  src?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
  glow?: string
  title: string
  preamble?: string
}

const sizeTable = {
  small: 200,
  medium: 280,
  large: 350
} as const

const useStyles = makeStyles<Theme, Omit<Props, 'preamble' | 'title'>>(theme =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: theme.spacing(5),
      height: ({ size = 'medium' }) => sizeTable[size],
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: ({ color }) => color,
      backgroundImage: ({ src, glow, color }) =>
        `linear-gradient(to bottom, ${
          color ? 'transparent' : 'black'
        }, transparent 6%, transparent, ${glow ?? 'black'} 40%)${
          src ? `, url(${src})` : ''
        }`
    },
    textContainer: {
      display: 'flex',
      padding: theme.spacing(2),
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: theme.palette.common.white,
      height: 'fit-content'
    }
  })
)

export default function HeaderImage({
  src,
  glow,
  color,
  title,
  preamble,
  size = 'medium'
}: Props): ReactElement {
  const classes = useStyles({ src, size, glow, color })
  return (
    <Box className={classes.root}>
      <Box className={classes.textContainer}>
        {preamble && (
          <Typography
            variant="caption"
            color="inherit"
            style={{ opacity: 0.7 }}
          >
            {preamble}
          </Typography>
        )}
        {title && (
          <Typography variant="h1" color="inherit">
            {title}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
