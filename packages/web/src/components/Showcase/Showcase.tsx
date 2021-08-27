import { ReactElement } from 'react'
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'

interface Props {
  Icon: ReactElement
  title: string
  body: string
}

/*
starting city
starting spice
starting treachery cards
free revivals
starting forces
*/

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: `1px solid ${theme.palette.grey[200]}`,
      padding: theme.spacing(2.5),
      boxShadow: '0px 15px 20px -10px rgb(0 0 0 / 20%)',
      paddingBottom: theme.spacing(1),
      borderRadius: 20,
      textAlign: 'center'
    },
    iconContainer: {
      position: 'relative',
      marginLeft: theme.spacing(0.5)
    },
    body: {
      fontWeight: 'bold',
      fontSize: theme.typography.pxToRem(36)
    }
  })
)

export default function Showcase({ Icon, title, body }: Props): ReactElement {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography variant="caption">{title}</Typography>
      <Box display="flex" alignItems="center">
        <Typography className={classes.body}>{body}</Typography>
        <Box className={classes.iconContainer}>{Icon}</Box>
      </Box>
    </Box>
  )
}
