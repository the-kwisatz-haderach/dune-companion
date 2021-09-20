import { Box, Button } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import { useGame, useGameDispatch } from '../../../../dune-react'
import { PromptProps } from '../../types'
import { SimplePrompt } from '../SimplePrompt'

export function SetCurrentFirstPlayerPrompt({
  closePrompt,
  ...props
}: PromptProps): ReactElement {
  const game = useGame()
  const [firstPlayerIndex, setFirstPlayerIndex] = useState<number>()
  const dispatch = useGameDispatch()

  const setFirstPlayer = () => {
    if (firstPlayerIndex !== undefined) {
      dispatch('SET_FIRST_PLAYER', {
        firstPlayerIndex
      })
      closePrompt()
    }
  }

  const selectPlayer = (index: number) => {
    if (firstPlayerIndex === index) {
      setFirstPlayerIndex(undefined)
    }
    setFirstPlayerIndex(index)
  }

  return (
    <SimplePrompt
      {...props}
      closePrompt={closePrompt}
      title="Select current first player"
      closable
      primaryAction={{
        label: 'Enter',
        onClick: setFirstPlayer,
        disabled: firstPlayerIndex === undefined
      }}
    >
      {game.playerOrder.map((playerId, index) => (
        <Box key={playerId}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => selectPlayer(index)}
          >
            {game.players[playerId]?.name}
          </Button>
        </Box>
      ))}
    </SimplePrompt>
  )
}
