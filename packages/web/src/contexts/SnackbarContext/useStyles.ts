import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { SnackType } from './types'

export const useStyles = makeStyles<Theme, { type?: SnackType }>(theme =>
  createStyles({
    alert: {
      width: '100%',
      color: theme.palette.primary.contrastText
    }
  })
)
