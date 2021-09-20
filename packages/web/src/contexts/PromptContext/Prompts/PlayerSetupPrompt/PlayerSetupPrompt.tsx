import { TextField } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import { Prompt } from '../../../../components/Prompt'
import useUserContext from '../../../UserContext'
import { useGameDispatch, usePlayer } from '../../../../dune-react'
import { PromptProps } from '../../types'

export function PlayerSetupPrompt({
  closePrompt,
  open
}: PromptProps): ReactElement {
  const { username } = useUserContext()
  const player = usePlayer()
  const [name, setName] = useState(username)
  const dispatch = useGameDispatch()

  const updateName = (name: string) => {
    dispatch('UPDATE_PLAYER_NAME', {
      name
    })
    closePrompt()
  }

  return (
    <Prompt
      open={open}
      title="Enter your name"
      onClose={player.name !== '' ? closePrompt : undefined}
      actions={[
        {
          label: 'Enter',
          onClick: () => updateName(name),
          disabled: !name
        }
      ]}
    >
      <form
        onSubmit={e => {
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
          onChange={e => setName(e.target.value)}
        />
      </form>
    </Prompt>
  )
}
