import { ReactElement } from 'react'
import {
  Theme,
  Box,
  createStyles,
  IconButton,
  makeStyles
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import { Player } from '@dune-companion/engine'

type Props = {
  faction?: Player['faction']
}

const useStyles = makeStyles<Theme, Props>(theme =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      height: 50,
      position: 'relative',
      borderTop: `1px solid ${theme.palette.grey[300]}`,
      boxShadow: theme.shadows[24]
    },
    item: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    centerItem: {
      color: ({ faction }) =>
        faction
          ? theme.palette[faction].contrastText
          : theme.palette.common.white,
      width: 70,
      height: 70,
      backgroundImage: ({ faction }) =>
        `radial-gradient(circle at top left, ${
          faction ? theme.palette[faction].light : theme.palette.grey[400]
        } 10px, ${
          faction ? theme.palette[faction].dark : theme.palette.common.black
        })`,
      borderRadius: '50%',
      position: 'absolute',
      bottom: 15,
      left: 'calc(50% - 35px)',
      zIndex: 1
    }
  })
)

export default function ActionMenu({ faction }: Props): ReactElement {
  const classes = useStyles({ faction })
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
