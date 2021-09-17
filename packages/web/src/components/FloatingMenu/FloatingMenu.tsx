import { useState, memo, ReactElement } from 'react'
import { Check as CheckIcon, NotInterested } from '@material-ui/icons'
import { Fab, Menu, MenuItem, ListItemText } from '@material-ui/core'
import { useCallback } from 'react'

type Action = {
  label: string
  onClick: () => void
  selected?: boolean
  disabled?: boolean
  selectable?: boolean
  style?: 'positive' | 'negative'
}

export type Props = {
  trigger: ReactElement
  disabled: boolean
  items: Action[]
}

const Item = memo(
  ({ label, disabled, selected, onClick, selectable = false }: Action) => (
    <MenuItem disabled={disabled} selected={selected} dense onClick={onClick}>
      {selected ? (
        <CheckIcon
          fontSize="small"
          style={{
            marginRight: 10,
            display: selectable ? 'initial' : 'none'
          }}
        />
      ) : (
        <NotInterested
          fontSize="small"
          style={{
            marginRight: 10,
            display: selectable ? 'initial' : 'none'
          }}
        />
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
