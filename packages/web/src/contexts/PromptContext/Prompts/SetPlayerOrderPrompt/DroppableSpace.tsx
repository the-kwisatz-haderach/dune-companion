import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { createStyles, makeStyles } from '@material-ui/core'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  provided: DroppableProvided
  snapshot: DroppableStateSnapshot
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      transition: 'background 0.2s ease-in-out',
      backgroundColor: theme.palette.grey[300],
      borderRadius: 5
    }
  })
)

export const DroppableSpace: React.FC<Props> = ({
  children,
  provided,
  snapshot
}) => {
  const classes = useStyles()
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className={classes.root}
    >
      {children}
    </div>
  )
}
