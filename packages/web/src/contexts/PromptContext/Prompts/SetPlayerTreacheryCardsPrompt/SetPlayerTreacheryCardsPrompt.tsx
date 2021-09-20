import { TextField } from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import { useGameDispatch, usePlayer } from '../../../../dune-react'
import { PromptProps } from '../../types'
import { SimplePrompt } from '../SimplePrompt'

const validateInput = (value: string): string => {
  if (value === '') return "Value can't be empty"
  return ''
}

export const SetPlayerTreacheryCardsPrompt = ({
  closePrompt,
  ...props
}: PromptProps) => {
  const dispatch = useGameDispatch()
  const player = usePlayer()
  const [cards, setCards] = useState(player.treacheryCards.toString())
  const [error, setError] = useState('')
  const isDirty = useRef(false)

  useEffect(() => {
    if (isDirty.current) {
      setError(validateInput(cards))
    }
  }, [cards])

  return (
    <SimplePrompt
      {...props}
      title="How many treachery cards do you have?"
      closePrompt={closePrompt}
      closable={false}
      primaryAction={{
        label: 'Confirm',
        disabled: cards === '',
        onClick: () => {
          if (!error) {
            dispatch('SET_PLAYER_TREACHERY_CARDS', {
              cards: Number.parseInt(cards)
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
        value={cards}
        type="number"
        onChange={e => {
          isDirty.current = true
          setCards(e.target.value)
        }}
      />
    </SimplePrompt>
  )
}
