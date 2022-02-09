import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'
import { NotInterested as Icon } from '@material-ui/icons'

type Props = {
  title: string
  description: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      flexDirection: 'column',
      borderRadius: 5,
      border: `2px dashed ${theme.palette.grey[300]}`,
      color: theme.palette.grey[500]
    },
    icon: {
      fontSize: theme.typography.pxToRem(72),
      marginBottom: theme.spacing(2),
      color: theme.palette.grey[500]
    }
  })
)

export const EmptyState = ({ title, description }: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Icon className={classes.icon} />
      <Typography variant="body2">{description}</Typography>
    </Box>
  )
}
