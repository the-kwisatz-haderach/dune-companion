import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField
} from '@material-ui/core'
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
    <Box className={classes.container}>
      <TextField
        label="Name"
        fullWidth
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => updateName(name)}
      >
        Enter
      </Button>
    </Box>
  )
}
