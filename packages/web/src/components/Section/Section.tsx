import React from 'react'
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'

interface Props {
  heading?: string
  description?: string
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      paddingTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      '&:nth-of-child(odd)': {
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        backgroundColor: theme.palette.grey[50]
      }
    },
    sectionHeading: {
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1)
    },
    sectionDescription: {
      marginBottom: theme.spacing(2)
    }
  })
)

export const Section: React.FC<Props> = ({
  children,
  heading,
  description
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.container} component="section">
      {(heading || description) && (
        <Box mb={4}>
          {heading && (
            <Typography variant="h6" className={classes.sectionHeading}>
              {heading}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" className={classes.sectionDescription}>
              {description}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Box>
  )
}
