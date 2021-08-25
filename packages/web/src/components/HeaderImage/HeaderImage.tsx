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

const useStyles = makeStyles<Theme, Omit<Props, 'preamble' | 'title'>>(theme =>
  createStyles({
    root: {
      width: '100%',
      height: ({ size }) =>
        size === 'small' ? 200 : size === 'large' ? 400 : 300,
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
      height: '75%'
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
