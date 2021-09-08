import { TextField } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import { Prompt } from '../../../components/Prompt'
import useUserContext from '../../UserContext'
import { useGameDispatch, usePlayer } from '../../../dune-react'
import { PromptProps } from '../types'
import { useEffect } from 'react'

export function PlayerSetupPrompt({ closePrompt }: PromptProps): ReactElement {
  const { username } = useUserContext()
  const player = usePlayer()
  const [name, setName] = useState(username)
  const dispatch = useGameDispatch()

  const updateName = (name: string) => {
    dispatch('UPDATE_PLAYER_NAME', {
      name
    })
  }

  useEffect(() => {
    if (player.name !== '') {
      closePrompt()
    }
  }, [player.name, closePrompt])

  return (
    <Prompt
      title="Enter your name"
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
