import { TextField } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import useUserContext from '../../../UserContext'
import { useGameDispatch } from '../../../../dune-react'
import { PromptProps } from '../../types'
import { SimplePrompt } from '../SimplePrompt'

export function PlayerSetupPrompt({
  closePrompt,
  open
}: PromptProps): ReactElement {
  const { username } = useUserContext()
  const [name, setName] = useState(username)
  const dispatch = useGameDispatch()

  const updateName = (name: string) => {
    dispatch('UPDATE_PLAYER_NAME', {
      name
    })
    closePrompt()
  }

  return (
    <SimplePrompt
      open={open}
      title="Enter your name"
      closable={false}
      closePrompt={closePrompt}
      primaryAction={{
        label: 'Enter',
        onClick: () => updateName(name),
        disabled: !name
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateName(name)
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          autoFocus
          fullWidth
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </SimplePrompt>
  )
}
