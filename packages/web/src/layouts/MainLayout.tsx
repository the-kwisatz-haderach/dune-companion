import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto'
    },
    root: {
      flexGrow: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    childContainer: {
      flex: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
)

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.childContainer}>{children}</div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit">
            <Typography>Play</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
