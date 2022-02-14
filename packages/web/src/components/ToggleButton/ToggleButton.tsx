import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import ReadyIcon from '@material-ui/icons/Check'

type Props = {
  onClick: () => void
  status: boolean
  disabled?: boolean
}

const useStyles = makeStyles<Theme, Pick<Props, 'status'>>((theme) =>
  createStyles({
    root: {
      transition:
        'box-shadow 0.1s linear, transform 0.1s linear, color 0.1s linear',
      backgroundColor: 'hsl(130deg 50% 56%)',
      border: ({ status }) =>
        `1px solid ${!status ? '#73df83b5' : 'transparent'}`,
      borderRadius: 10,
      color: ({ status }) => (status ? '#eaffed' : 'rgb(160 249 174)'),
      boxShadow: ({ status }) => (!status ? '1px 4px #349943' : 'none'),
      transform: ({ status }) =>
        status ? 'translateY(4px) translateX(1px)' : 'initial',
      '&:hover, &:active, &:visited': {
        backgroundColor: 'hsl(130deg 50% 56%)',
        boxShadow: ({ status }) => (!status ? '1px 4px #349943' : 'none')
        // transform: 'translateY(4px) translateX(1px)'
      }
    }
  })
)

export const ToggleButton: React.FC<Props> = ({
  children,
  onClick,
  status,
  disabled
}) => {
  const classes = useStyles({ status })
  return (
    <Button
      disabled={disabled}
      className={classes.root}
      onClick={onClick}
      variant="contained"
      // startIcon={<ReadyIcon />}
    >
      {children}
    </Button>
  )
}
