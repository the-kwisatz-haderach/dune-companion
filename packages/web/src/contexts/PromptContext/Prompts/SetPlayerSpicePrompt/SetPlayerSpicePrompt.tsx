import { TextField } from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import { useGameDispatch, usePlayer } from '../../../../dune-react'
import { PromptProps } from '../../types'
import { SimplePrompt } from '../SimplePrompt'

const validateInput = (value: string): string => {
  if (value === '') return "Value can't be empty"
  return ''
}

export const SetPlayerSpicePrompt = ({
  closePrompt,
  ...props
}: PromptProps) => {
  const dispatch = useGameDispatch()
  const player = usePlayer()
  const [spice, setSpice] = useState(player.spice.toString())
  const [error, setError] = useState('')
  const isDirty = useRef(false)

  useEffect(() => {
    if (isDirty.current) {
      setError(validateInput(spice))
    }
  }, [spice])

  return (
    <SimplePrompt
      {...props}
      title="How much spice do you have?"
      closePrompt={closePrompt}
      closable={false}
      primaryAction={{
        label: 'Confirm',
        disabled: spice === '',
        onClick: () => {
          if (!error) {
            dispatch('SET_PLAYER_SPICE', {
              spice: Number.parseInt(spice)
            })
            closePrompt()
          }
        }
      }}
    >
      <TextField
        error={error !== ''}
        helperText={error}
        fullWidth
        inputProps={{
          min: 0
        }}
        value={spice}
        type="number"
        onChange={(e) => {
          isDirty.current = true
          setSpice(e.target.value)
        }}
      />
    </SimplePrompt>
  )
}
