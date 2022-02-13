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
  subtitle?: string
  BackdropIcon?: React.ComponentType<{ className?: string }>
}

const sizeTable = {
  small: 240,
  medium: 320,
  large: 420
} as const

const useStyles = makeStyles<Theme, Omit<Props, 'preamble' | 'title'>>(
  (theme) =>
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
        backgroundColor: ({ color }) => color ?? theme.palette.primary.dark,
        transition: 'background 1s ease-in-out',
        backgroundImage: ({ src, glow, color }) =>
          `linear-gradient(to bottom, ${
            color ? 'transparent' : theme.palette.primary.main
          }, transparent 6%, transparent, ${
            glow ?? theme.palette.primary.light
          } 40%)${src ? `, url(${src})` : ''}`
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
        width: '100%',
        height: '50%',
        zIndex: 0,
        top: -50,
        right: 0,
        left: 0,
        bottom: 0,
        fill: 'white',
        opacity: 0.2
      },
      title: {
        fontSize: ({ size }) =>
          size === 'small' ? theme.typography.pxToRem(32) : '3rem'
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
  BackdropIcon,
  size = 'medium'
}: Props): ReactElement {
  const classes = useStyles({ src, size, glow, color })
  return (
    <Box className={classes.root}>
      {BackdropIcon && <BackdropIcon className={classes.icon} />}
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
          <Typography variant="h1" color="inherit" className={classes.title}>
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
