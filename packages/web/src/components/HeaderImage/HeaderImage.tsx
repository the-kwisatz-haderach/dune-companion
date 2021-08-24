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
}

const useStyles = makeStyles<Theme, { src: string }>(() =>
  createStyles({
    root: {
      width: '100%',
      height: 300,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: ({ src }) =>
        `linear-gradient(to bottom, black, transparent 20%, transparent 85%, black), url(${src})`
    }
  })
)

export default function HeaderImage({ src, text }: Props): ReactElement {
  const classes = useStyles({ src })
  return (
    <Box className={classes.root}>
      {text && <Typography>{text}</Typography>}
    </Box>
  )
}
