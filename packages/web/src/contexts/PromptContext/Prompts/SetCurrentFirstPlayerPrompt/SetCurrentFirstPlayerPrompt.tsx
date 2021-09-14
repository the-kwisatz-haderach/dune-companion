import { Box, Button } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import { Prompt } from '../../../../components/Prompt'
import { useGame, useGameDispatch } from '../../../../dune-react'
import { PromptProps } from '../../types'

export function SetCurrentFirstPlayerPrompt({
  closePrompt
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
    <Prompt
      title="Select current first player"
      actions={[
        {
          label: 'Enter',
          onClick: setFirstPlayer,
          disabled: firstPlayerIndex === undefined
        }
      ]}
    >
      {game.playerOrder.map((playerId, index) => (
        <Box key={playerId}>
          <Button onClick={() => selectPlayer(index)}>
            {game.players[playerId]?.name}
          </Button>
        </Box>
      ))}
    </Prompt>
  )
}
