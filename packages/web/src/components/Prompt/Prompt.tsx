import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button, createStyles, makeStyles, Typography } from '@material-ui/core'
import { DialogProps } from '@material-ui/core'

type DialogAction = {
  label: string
  onClick: () => void
  disabled?: boolean
}

export interface Props extends DialogProps {
  title?: string
  isRequired?: boolean
  actions: [DialogAction, ...DialogAction[]]
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {},
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
  open,
  ...props
}: Props) {
  const classes = useStyles()
  const [primaryAction, ...otherActions] = actions
  return (
    <Dialog {...props} open={open} className={classes.container}>
      <DialogTitle
        className={classes.titleBar}
        disableTypography
        hidden={!title}
      >
        <Typography variant="caption">{title}</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {otherActions.map(({ disabled, onClick, label }) => (
          <Button disabled={disabled} onClick={onClick} color="default">
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
