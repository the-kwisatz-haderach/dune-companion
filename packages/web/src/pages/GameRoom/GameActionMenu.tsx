import { ReactElement, useState } from 'react'
import {
  Box,
  createStyles,
  makeStyles,
  Fab,
  Menu,
  MenuItem
} from '@material-ui/core'
import { FilterList as FilterIcon } from '@material-ui/icons'
import { Menu as MenuIcon } from '@material-ui/icons'
import { memo } from 'react'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: 500,
      bottom: theme.spacing(1),
      left: 10,
      width: 'calc(100% - 20px)',
      display: 'flex',
      justifyContent: 'space-between',
      color: theme.palette.common.white,
      pointerEvents: 'none',
      '& button': {
        pointerEvents: 'initial'
      }
    }
  })
)

type Action = {
  label: string
  onClick: () => void
  style?: 'positive' | 'negative'
}

export type Props = {
  filters: Action[]
  secondaryActions: Action[]
  primaryAction?: Action
}

const PrimaryActionButton = ({
  primaryAction
}: Pick<Props, 'primaryAction'>) => (
  <>
    {primaryAction && (
      <Fab
        color={primaryAction.style === 'negative' ? 'default' : 'primary'}
        size="large"
        variant="extended"
        onClick={primaryAction.onClick}
      >
        {primaryAction.label}
      </Fab>
    )}
  </>
)

function GameActionMenu({
  filters,
  secondaryActions,
  primaryAction
}: Props): ReactElement {
  const classes = useStyles()
  const [
    secondaryAnchorEl,
    setSecondaryAnchorEl
  ] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenSecondaryMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setFilterAnchorEl(null)
    setSecondaryAnchorEl(event.currentTarget)
  }

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSecondaryAnchorEl(null)
    setFilterAnchorEl(event.currentTarget)
  }

  const handleCloseSecondaryMenu = () => {
    setSecondaryAnchorEl(null)
  }

  const handleCloseFilterMenu = () => {
    setFilterAnchorEl(null)
  }

  return (
    <Box className={classes.root}>
      <Fab
        disabled={secondaryActions.length === 0}
        variant="extended"
        onClick={handleOpenSecondaryMenu}
      >
        <MenuIcon />
      </Fab>
      <PrimaryActionButton primaryAction={primaryAction} />
      <Fab
        disabled={filters.length === 0}
        variant="extended"
        onClick={handleOpenFilterMenu}
      >
        <FilterIcon />
      </Fab>
      {secondaryActions.length > 0 && (
        <Menu
          anchorEl={secondaryAnchorEl}
          open={Boolean(secondaryAnchorEl)}
          onClose={handleCloseSecondaryMenu}
        >
          {secondaryActions.map(({ label, onClick }) => (
            <MenuItem
              onClick={() => {
                onClick()
                handleCloseSecondaryMenu()
              }}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      )}
      {filters.length > 0 && (
        <Menu
          keepMounted
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleCloseFilterMenu}
        >
          {filters.map(({ label, onClick }) => (
            <MenuItem
              onClick={() => {
                onClick()
                handleCloseFilterMenu()
              }}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  )
}

export default memo(GameActionMenu)
