import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core'
import { DialogProps } from '@material-ui/core'

type DialogAction = {
  label: string
  onClick: () => void
  disabled?: boolean
}

export interface Props extends Omit<DialogProps, 'open'> {
  title?: string
  isRequired?: boolean
  actions: [DialogAction, ...DialogAction[]]
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
    }
  })
)

export default function Prompt({
  children,
  title,
  actions,
  isRequired = true,
  open = true,
  contentClassName,
  ...props
}: Props) {
  const classes = useStyles({ open })
  const [primaryAction, ...otherActions] = actions
  return (
    <Dialog {...props} open={open} className={classes.root}>
      <DialogTitle
        className={classes.titleBar}
        disableTypography
        hidden={!title}
      >
        <Typography variant="caption">{title}</Typography>
      </DialogTitle>
      <DialogContent className={contentClassName}>{children}</DialogContent>
      <DialogActions>
        {otherActions.map(({ disabled, onClick, label }, index) => (
          <Button
            key={index}
            disabled={disabled}
            onClick={onClick}
            color="default"
          >
            {label}
          </Button>
        ))}
        <Button
          disabled={primaryAction.disabled}
          onClick={primaryAction.onClick}
          color="primary"
        >
          {primaryAction.label}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
