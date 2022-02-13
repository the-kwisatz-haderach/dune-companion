import {
  Box,
  BoxProps,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'
import { PropsWithChildren, ReactElement } from 'react'

interface Props extends BoxProps {
  spacing?: number
}

const useStyles = makeStyles<Theme, Props>((theme) =>
  createStyles({
    cardContainer: {
      marginBottom: theme.spacing(3),
      '& > *:not(:last-child)': {
        marginBottom: ({ spacing = 2 }) => theme.spacing(spacing)
      }
    }
  })
)

export default function MarginList({
  children,
  spacing,
  ...boxProps
}: PropsWithChildren<Props>): ReactElement {
  const classes = useStyles({ spacing })
  return (
    <Box {...boxProps} className={classes.cardContainer}>
      {children}
    </Box>
  )
}
