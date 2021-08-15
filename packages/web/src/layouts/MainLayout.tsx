import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import useUserContext from '../contexts/UserContext'

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
    toolBar: {
      justifyContent: 'space-between'
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
  const { isAuthenticated, username, authenticate } = useUserContext()
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {isAuthenticated ? (
            <Typography>{username}</Typography>
          ) : (
            <Button color="inherit" onClick={authenticate}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.childContainer}>{children}</div>
    </div>
  )
}
