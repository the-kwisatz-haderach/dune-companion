import { useState, memo, ReactElement } from 'react'
import {
  Menu as MUIMenu,
  MenuItem,
  ListItemText,
  SvgIconTypeMap
} from '@material-ui/core'
import { useCallback } from 'react'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

type Action = {
  label: string
  onClick: () => void
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  selected?: boolean
  disabled?: boolean
  actionType?: 'primary' | 'secondary'
  style?: 'positive' | 'negative' | 'neutral'
}

export type Props = {
  trigger: ReactElement
  items: Action[]
}

const Item = memo(({ label, disabled, selected, onClick }: Action) => (
  <MenuItem disabled={disabled} selected={selected} dense onClick={onClick}>
    <ListItemText primary={label} />
  </MenuItem>
))

export const Menu = memo(({ trigger, items }: Props) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (Boolean(anchorElement)) {
        return setAnchorElement(null)
      }
      setAnchorElement(event.currentTarget)
    },
    [anchorElement]
  )

  const handleCloseMenu = useCallback(() => {
    setAnchorElement(null)
  }, [])

  return (
    <>
      <div onClick={handleOpenMenu}>{trigger}</div>
      <MUIMenu
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
      </MUIMenu>
    </>
  )
})
