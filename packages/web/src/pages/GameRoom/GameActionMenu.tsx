import { ReactElement, memo } from 'react'
import { Box, createStyles, makeStyles, Fab } from '@material-ui/core'
import { Settings as SettingsIcon, Menu as MenuIcon } from '@material-ui/icons'
import { FloatingMenu, FloatingMenuProps } from '../../components/FloatingMenu'

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

export type Props = {
  filters: FloatingMenuProps['items']
  secondaryActions: FloatingMenuProps['items']
  primaryAction?: FloatingMenuProps['items'][number]
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
  return (
    <Box className={classes.root}>
      <FloatingMenu
        trigger={<MenuIcon />}
        disabled={secondaryActions.length === 0}
        items={secondaryActions}
      />
      <PrimaryActionButton primaryAction={primaryAction} />
      <FloatingMenu
        trigger={<SettingsIcon />}
        disabled={filters.length === 0}
        items={filters}
      />
    </Box>
  )
}

export default memo(GameActionMenu)
