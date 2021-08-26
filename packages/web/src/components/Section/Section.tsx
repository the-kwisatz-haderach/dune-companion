import React from 'react'
import { Box, Typography } from '@material-ui/core'

interface Props {
  heading: string
}

export const Section: React.FC<Props> = ({ children, heading }) => {
  return (
    <Box component="section" my={4}>
      <Typography
        variant="h6"
        style={{
          textTransform: 'uppercase'
        }}
      >
        {heading}
      </Typography>
      <Box mt={1}>{children}</Box>
    </Box>
  )
}
