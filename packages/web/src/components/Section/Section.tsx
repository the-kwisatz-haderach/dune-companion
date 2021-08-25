import React from 'react'
import { Box, Typography } from '@material-ui/core'

interface Props {
  heading: string
}

export const Section: React.FC<Props> = ({ children, heading }) => {
  return (
    <Box component="section">
      <Typography variant="h5">{heading}</Typography>
      <Box mt={1}>{children}</Box>
    </Box>
  )
}
