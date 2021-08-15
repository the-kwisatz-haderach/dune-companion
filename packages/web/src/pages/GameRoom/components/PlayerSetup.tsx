import { Button, createStyles, makeStyles, TextField } from '@material-ui/core'
import { ReactElement, useState } from 'react'

interface Props {
  defaultName?: string
  updateName: (name: string) => void
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: '100%',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2)
      }
    }
  })
)

export default function PlayerSetup({
  updateName,
  defaultName = ''
}: Props): ReactElement {
  const classes = useStyles()
  const [name, setName] = useState(defaultName)
  return (
    <form
      className={classes.container}
      onSubmit={e => {
        e.preventDefault()
        updateName(name)
      }}
    >
      <TextField
        label="Name"
        fullWidth
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Enter
      </Button>
    </form>
  )
}
