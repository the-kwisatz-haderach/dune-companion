import { ReactElement } from 'react'
import {
  Theme,
  Box,
  createStyles,
  makeStyles,
  Typography,
  Slide
} from '@material-ui/core'

interface Props {
  src?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
  glow?: string
  title: string
  preamble?: string
  subtitle?: string
  BackdropImage?: React.ComponentType<{ className?: string }>
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
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: theme.spacing(5),
      height: ({ size = 'medium' }) => sizeTable[size],
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: ({ color }) => color ?? 'grey',
      transition: 'background 1s ease-in-out',
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
      color: ({ color }) =>
        color ? theme.palette.getContrastText(color) : 'white',
      height: 'fit-content',
      zIndex: 1
    },
    icon: {
      position: 'fixed',
      width: 400,
      height: 400,
      zIndex: 0,
      top: -50,
      left: 'calc(50% - 200px)',
      fill: 'white',
      opacity: 0.2
    }
  })
)

export default function HeaderImage({
  src,
  glow,
  color,
  title,
  preamble,
  subtitle,
  BackdropImage,
  size = 'medium'
}: Props): ReactElement {
  const classes = useStyles({ src, size, glow, color })
  return (
    <Box className={classes.root}>
      {BackdropImage && <BackdropImage className={classes.icon} />}
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
        {subtitle && (
          <Typography variant="subtitle1" color="inherit">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
