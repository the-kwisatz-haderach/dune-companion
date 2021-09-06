import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'

type Props = {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  index: number
}

const useStyles = makeStyles<Theme, { isDragging: boolean }>(theme =>
  createStyles({
    root: {
      userSelect: 'none',
      padding: theme.spacing(2),
      transition: 'background 0.2s ease-in-out',
      backgroundColor: ({ isDragging }) =>
        isDragging ? theme.palette.primary.light : theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: 5,
      '&:not(:last-child)': {
        marginBottom: theme.spacing(1)
      }
    }
  })
)

export const DraggableBlock: React.FC<Props> = ({
  children,
  provided,
  snapshot,
  index
}) => {
  const classes = useStyles({ isDragging: snapshot.isDragging })
  return (
    <Typography
      ref={provided.innerRef}
      style={provided.draggableProps.style}
      className={classes.root}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {index + 1}. {children}
    </Typography>
  )
}
