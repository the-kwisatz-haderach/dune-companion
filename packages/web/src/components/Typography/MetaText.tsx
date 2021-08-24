import { Theme, createStyles, makeStyles, Typography } from '@material-ui/core'

type Props = { size?: 'small' | 'medium' }

const useStyles = makeStyles<Theme, Props>(theme =>
  createStyles({
    root: {
      fontSize: ({ size }) =>
        size === 'small' ? theme.typography.pxToRem(10) : undefined
    }
  })
)

export const MetaText: React.FC<Props> = ({ children, size = 'medium' }) => {
  const classes = useStyles({ size })
  return (
    <Typography variant="caption" className={classes.root}>
      {children}
    </Typography>
  )
}
