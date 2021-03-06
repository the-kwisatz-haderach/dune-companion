import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd'
import { ReactElement, useState } from 'react'
import { Prompt } from '../../../../components/Prompt'
import { useGame, useGameDispatch } from '../../../../dune-react'
import { DraggableBlock } from './DraggableBlock'
import { DroppableSpace } from './DroppableSpace'
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'
import { PromptProps } from '../../types'

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      overflow: 'unset'
    }
  })
)

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default function SetPlayerOrderPrompt({
  closePrompt,
  open
}: PromptProps): ReactElement {
  const classes = useStyles()
  const game = useGame()
  const [playerOrder, setPlayerOrder] = useState(game.playerOrder)
  const dispatch = useGameDispatch()

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      playerOrder,
      result.source.index,
      result.destination.index
    )
    setPlayerOrder(items)
  }

  const updatePlayerOrder = () => {
    dispatch('SET_PLAYER_ORDER', {
      playerOrder
    })
    closePrompt()
  }

  return (
    <Prompt
      fullWidth
      open={open}
      onClose={closePrompt}
      contentClassName={classes.dialogContent}
      maxWidth="md"
      title="Set Player Order"
      actions={[
        {
          label: 'Update',
          onClick: updatePlayerOrder
        },
        {
          label: 'Close',
          onClick: closePrompt
        }
      ]}
    >
      <Box display="flex" justifyContent="center" margin={1}>
        <Typography variant="body2">First</Typography>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, droppableSnapshot) => (
            <DroppableSpace
              snapshot={droppableSnapshot}
              provided={provided}
              ref={provided.innerRef}
            >
              {playerOrder.map((playerId, index) => (
                <Draggable key={playerId} draggableId={playerId} index={index}>
                  {(provided, snapshot) => (
                    <DraggableBlock provided={provided} snapshot={snapshot}>
                      {game.players[playerId].name}
                    </DraggableBlock>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DroppableSpace>
          )}
        </Droppable>
      </DragDropContext>
      <Box display="flex" justifyContent="center" margin={1}>
        <Typography variant="body2">Last</Typography>
      </Box>
    </Prompt>
  )
}
