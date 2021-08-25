import { ReactElement } from 'react'
import {
  Theme,
  Box,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core'

interface Props {
  src: string
  text?: string
  size?: 'small' | 'medium' | 'large'
  glow?: string
}

const useStyles = makeStyles<Theme, Omit<Props, 'text'>>(() =>
  createStyles({
    root: {
      width: '100%',
      height: ({ size }) =>
        size === 'small' ? 200 : size === 'large' ? 400 : 300,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundImage: ({ src, glow }) =>
        `linear-gradient(to bottom, black, transparent 10%, transparent, ${glow ??
          'black'} 43%), url(${src})`
    }
  })
)

export default function HeaderImage({
  src,
  text,
  glow,
  size = 'medium'
}: Props): ReactElement {
  const classes = useStyles({ src, size, glow })
  return (
    <Box className={classes.root}>
      {text && <Typography>{text}</Typography>}
    </Box>
  )
}
