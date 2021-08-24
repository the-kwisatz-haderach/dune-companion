import React from 'react'
import { Box, createStyles, makeStyles } from '@material-ui/core'
import { ActionMenu } from '../components/ActionMenu'

const useStyles = makeStyles(theme =>
  createStyles({
    fixedBottom: {
      boxShadow: theme.shadows[20]
    }
  })
)

export const GameLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <Box>
      {children}
      <Box
        className={classes.fixedBottom}
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
      >
        <ActionMenu />
      </Box>
    </Box>
  )
}
