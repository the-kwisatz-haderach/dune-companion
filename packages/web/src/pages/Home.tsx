import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core'
import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import dune from '../images/dune.jpeg'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: 15,
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `linear-gradient(to bottom, transparent, transparent, ${theme.palette.primary.main} 80%)`
    },
    image: {
      zIndex: -1,
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
      transform: 'translate(-58%, -300px) scale(1)'
    },
    link: {
      height: '100%',
      width: '100%',
      textDecoration: 'none',
      '&:first-child': {
        marginBottom: 15
      }
    },
    headingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '50%',
      color: theme.palette.common.white
    },
    playContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

export default function Home(): ReactElement {
  const classes = useStyles()
  const history = useHistory()
  return (
    <Container className={classes.container}>
      <img className={classes.image} src={dune} />
      <Box className={classes.headingContainer}>
        <Typography>Welcome to the</Typography>
        <Typography variant="h1">Dune Companion</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50%"
        p={1}
      >
        <Button onClick={() => history.push('/game')} variant="contained">
          Play as guest
        </Button>
      </Box>
    </Container>
  )
}
