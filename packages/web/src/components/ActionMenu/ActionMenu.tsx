import { ReactElement } from 'react'
import { Box, createStyles, IconButton, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      height: 50,
      position: 'relative'
    },
    item: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    centerItem: {
      color: theme.palette.common.white,
      width: 70,
      height: 70,
      backgroundImage:
        'radial-gradient(circle at bottom center, #00d01a 15px, #b7ff08)',
      borderRadius: '50%',
      position: 'absolute',
      bottom: 30,
      left: 'calc(50% - 35px)',
      zIndex: 1
    }
  })
)

export default function ActionMenu(): ReactElement {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.item}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>
      <Box className={`${classes.item} ${classes.centerItem}`}>
        <IconButton color="inherit">
          <HomeIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box className={classes.item}>
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
