import { ReactElement } from 'react'
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'

interface Props {
  Icon: ReactElement
  title: string
  body: string
}

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
      paddingBottom: theme.spacing(2),
      borderRadius: 20,
      textAlign: 'center'
    },
    iconContainer: {
      position: 'relative',
      marginLeft: theme.spacing(0.8)
    },
    body: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      lineHeight: 1
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
