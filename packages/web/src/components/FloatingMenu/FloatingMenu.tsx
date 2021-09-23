import { useState, memo, ReactElement } from 'react'
import {
  Fab,
  Menu,
  MenuItem,
  ListItemText,
  SvgIconTypeMap
} from '@material-ui/core'
import { useCallback } from 'react'
import { SelectableIcon } from './SelectableIcon'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

type Action = {
  label: string
  onClick: () => void
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  selected?: boolean
  disabled?: boolean
  selectable?: boolean
  actionType?: 'primary' | 'secondary'
  style?: 'positive' | 'negative' | 'neutral'
}

export type Props = {
  trigger: ReactElement
  disabled: boolean
  items: Action[]
}

const Item = memo(
  ({
    Icon,
    label,
    disabled,
    selected,
    onClick,
    selectable = false
  }: Action) => (
    <MenuItem disabled={disabled} selected={selected} dense onClick={onClick}>
      {selectable && <SelectableIcon selected={Boolean(selected)} />}
      {Icon && !selectable && (
        <Icon style={{ marginRight: 5 }} fontSize="small" />
      )}
      <ListItemText primary={label} />
    </MenuItem>
  )
)

export const FloatingMenu = memo(({ trigger, disabled, items }: Props) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget)
    },
    []
  )

  const handleCloseMenu = useCallback(() => {
    setAnchorElement(null)
  }, [])

  return (
    <>
      <Fab disabled={disabled} variant="extended" onClick={handleOpenMenu}>
        {trigger}
      </Fab>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleCloseMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {items.map((item, index) => (
          <div key={index}>
            <Item {...item} />
          </div>
        ))}
      </Menu>
    </>
  )
})
