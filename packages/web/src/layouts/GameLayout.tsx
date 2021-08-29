import React from 'react'
import { Box, createStyles, makeStyles } from '@material-ui/core'
import { ActionMenu } from '../components/ActionMenu'
import { Factions } from '@dune-companion/engine'
import { usePlayer } from '../dune-react'

const useStyles = makeStyles(() =>
  createStyles({
    fixedBottom: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%'
    }
  })
)

export const GameLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  const player = usePlayer()
  return (
    <Box>
      <Box mb={2}>{children}</Box>
      {/* <Box className={classes.fixedBottom}>
        <ActionMenu primaryActionLabel="Select" />
      </Box> */}
    </Box>
  )
}
