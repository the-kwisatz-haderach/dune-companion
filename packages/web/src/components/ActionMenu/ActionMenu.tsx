import { ReactElement } from 'react'
import {
  Box,
  createStyles,
  makeStyles,
  Typography,
  Fab
} from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

type Props = {
  primaryActionLabel: string
  primaryActionPreamble?: string
  primaryActionType?: 'positive' | 'negative' | 'neutral'
  primaryActionIsDisabled?: boolean
  onPrimaryAction: () => void
  secondaryActionLeftLabel?: string
  onSecondaryActionLeft?: () => void
  secondaryActionRightLabel?: string
  onSecondaryActionRight?: () => void
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: 500,
      bottom: theme.spacing(1),
      left: 10,
      width: 'calc(100% - 20px)',
      display: 'flex',
      justifyContent: 'space-between',
      color: theme.palette.common.white,
      pointerEvents: 'none',
      '& button': {
        pointerEvents: 'initial'
      }
    },
    preamble: {
      position: 'absolute',
      bottom: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: theme.spacing(1),
      borderRadius: 5,
      whiteSpace: 'nowrap'
    }
  })
)

export default function ActionMenu({
  primaryActionLabel,
  primaryActionPreamble,
  onPrimaryAction,
  secondaryActionLeftLabel,
  onSecondaryActionLeft,
  secondaryActionRightLabel,
  onSecondaryActionRight,
  primaryActionIsDisabled = false,
  primaryActionType = 'neutral'
}: Props): ReactElement {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      {onSecondaryActionLeft && secondaryActionLeftLabel && (
        <Fab variant="extended" onClick={onSecondaryActionLeft}>
          <NavigateBefore />
        </Fab>
      )}
      <Box position="relative" display="flex" flex={1} justifyContent="center">
        {primaryActionPreamble && (
          <Typography variant="body2" className={classes.preamble}>
            {primaryActionPreamble}
          </Typography>
        )}
        <Fab
          size="large"
          variant="extended"
          disabled={primaryActionIsDisabled}
          color={primaryActionType === 'positive' ? 'primary' : 'default'}
          onClick={onPrimaryAction}
        >
          {primaryActionLabel}
        </Fab>
      </Box>
      {onSecondaryActionRight && secondaryActionRightLabel && (
        <Fab variant="extended" onClick={onSecondaryActionRight}>
          <NavigateNext />
        </Fab>
      )}
    </Box>
  )
}
