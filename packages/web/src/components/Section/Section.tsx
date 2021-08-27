import React from 'react'
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'

interface Props {
  heading: string
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      '&:nth-child(odd)': {
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        backgroundColor: theme.palette.grey[50]
      }
    },
    sectionHeading: {
      textTransform: 'uppercase',
      marginBottom: theme.spacing(2)
    }
  })
)

export const Section: React.FC<Props> = ({ children, heading }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container} component="section">
      <Typography variant="h6" className={classes.sectionHeading}>
        {heading}
      </Typography>
      <Box>{children}</Box>
    </Box>
  )
}