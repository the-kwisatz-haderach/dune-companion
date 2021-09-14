import { Box, createStyles, makeStyles } from '@material-ui/core'
import { PropsWithChildren, ReactElement } from 'react'

interface Props {}

const useStyles = makeStyles(theme =>
  createStyles({
    cardContainer: {
      marginBottom: theme.spacing(2),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(3)
      }
    }
  })
)

export default function MarginList({
  children
}: PropsWithChildren<Props>): ReactElement {
  const classes = useStyles()
  return <Box className={classes.cardContainer}>{children}</Box>
}
