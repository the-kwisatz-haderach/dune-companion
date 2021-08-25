import { Button, createStyles, makeStyles, TextField } from '@material-ui/core'
import { ReactElement, useState } from 'react'
import useUserContext from '../../../contexts/UserContext'
import { useGameDispatch } from '../../../dune-react'

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

export default function PlayerSetup(): ReactElement {
  const classes = useStyles()
  const { username } = useUserContext()
  const [name, setName] = useState(username)
  const dispatch = useGameDispatch()

  const updateName = (name: string) => {
    dispatch('UPDATE_PLAYER_NAME', {
      name
    })
  }

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
        autoFocus
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
