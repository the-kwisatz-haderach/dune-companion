import { TextField } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import { Prompt } from '../../../components/Prompt'
import useUserContext from '../../../contexts/UserContext'
import { useGameDispatch, usePlayer } from '../../../dune-react'

export default function PlayerSetupPrompt(): ReactElement {
  const { username } = useUserContext()
  const player = usePlayer()
  const [name, setName] = useState(username)
  const dispatch = useGameDispatch()

  const updateName = (name: string) => {
    dispatch('UPDATE_PLAYER_NAME', {
      name
    })
  }

  return (
    <Prompt
      title="Enter your name"
      open={player.name === ''}
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
