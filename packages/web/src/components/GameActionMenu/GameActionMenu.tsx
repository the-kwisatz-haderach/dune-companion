import { ReactElement, memo } from 'react'
import { Box, createStyles, makeStyles, Fab } from '@material-ui/core'
import { Settings as SettingsIcon, Menu as MenuIcon } from '@material-ui/icons'
import { FloatingMenu, FloatingMenuProps } from '../FloatingMenu'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      color: theme.palette.common.white,
      pointerEvents: 'none',
      '& button': {
        pointerEvents: 'initial',
        '&:first-child': {
          marginLeft: theme.spacing(1)
        },
        '&:last-child': {
          marginRight: theme.spacing(1)
        }
      }
    }
  })
)

export type Props = {
  settingsMenu: FloatingMenuProps['items']
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
  settingsMenu,
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
        disabled={settingsMenu.length === 0}
        items={settingsMenu}
      />
    </Box>
  )
}

export default memo(GameActionMenu)
