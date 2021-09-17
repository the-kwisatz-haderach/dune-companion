import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { createStyles, makeStyles } from '@material-ui/core'
import { forwardRef } from 'react'

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

export const DroppableSpace = forwardRef<HTMLDivElement, Props>(
  ({ children, provided }, ref) => {
    const classes = useStyles()
    return (
      <div {...provided.droppableProps} ref={ref} className={classes.root}>
        {children}
      </div>
    )
  }
)
