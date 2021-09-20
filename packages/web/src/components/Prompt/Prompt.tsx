import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  Button,
  createStyles,
  makeStyles,
  Slide,
  Theme,
  Typography
} from '@material-ui/core'
import { DialogProps } from '@material-ui/core'
import { forwardRef } from 'react'
import { TransitionProps } from '@material-ui/core/transitions'

export type DialogAction = {
  label: string
  onClick: () => void
  disabled?: boolean
}

export interface Props extends Omit<DialogProps, 'open'> {
  title?: string
  isRequired?: boolean
  actions?: [DialogAction, ...DialogAction[]]
  contentClassName?: string
  open?: boolean
}

const useStyles = makeStyles<Theme, { open: boolean }>(() =>
  createStyles({
    root: {
      zIndex: 10000
    },
    titleBar: {
      textAlign: 'right'
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
)

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Prompt({
  children,
  title,
  actions,
  isRequired = true,
  open = true,
  contentClassName,
  transitionDuration = 500,
  ...props
}: Props) {
  const classes = useStyles({ open })
  return (
    <Dialog
      {...props}
      open={open}
      className={classes.root}
      transitionDuration={transitionDuration}
      TransitionComponent={Transition}
    >
      <DialogTitle
        className={classes.titleBar}
        disableTypography
        hidden={!title}
      >
        <Typography variant="caption">{title}</Typography>
      </DialogTitle>
      <DialogContent className={contentClassName}>{children}</DialogContent>
      <DialogActions className={classes.actions}>
        <div>
          {actions &&
            actions.slice(1).map(({ disabled, onClick, label }, index) => (
              <Button
                key={index}
                disabled={disabled}
                onClick={onClick}
                color="default"
              >
                {label}
              </Button>
            ))}
        </div>
        <div>
          {actions && (
            <Button
              disabled={actions[0].disabled}
              onClick={actions[0].onClick}
              color="primary"
            >
              {actions[0].label}
            </Button>
          )}
        </div>
      </DialogActions>
    </Dialog>
  )
}
