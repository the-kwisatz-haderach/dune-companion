import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'
import { NotInterested as Icon } from '@material-ui/icons'

type Props = {
  title: string
  description: string
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      flexDirection: 'column',
      backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      borderRadius: 5,
      color: theme.palette.common.white
    },
    icon: {
      fontSize: theme.typography.pxToRem(72),
      marginBottom: theme.spacing(2),
      color: theme.palette.common.white
    }
  })
)

export const EmptyState = ({ title, description }: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Icon className={classes.icon} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  )
}
