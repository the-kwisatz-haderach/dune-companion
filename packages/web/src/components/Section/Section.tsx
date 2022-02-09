import React from 'react'
import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core'
import { Factions } from '@dune-companion/engine'

interface Props {
  heading: string
  faction?: Factions
  description?: string
}

const useStyles = makeStyles<Theme, Pick<Props, 'faction'>>((theme) =>
  createStyles({
    container: {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      '&:nth-child(odd)': {
        backgroundColor: theme.palette.grey[50]
      }
    },
    sectionHeading: {
      marginBottom: theme.spacing(1),
      color: 'white',
      marginLeft: -16,
      paddingLeft: 16,
      width: 'fit-content',
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontSize: 14,
      letterSpacing: 1,
      backgroundColor: ({ faction }) =>
        faction ? theme.palette[faction].dark : theme.palette.grey[800]
    },
    sectionDescription: {
      marginBottom: theme.spacing(2)
    }
  })
)

export const Section: React.FC<Props> = ({
  children,
  heading,
  description,
  faction
}) => {
  const classes = useStyles({ faction })
  return (
    <Box className={classes.container} component="section">
      {(heading || description) && (
        <Box mb={2}>
          <Typography variant="h6" className={classes.sectionHeading}>
            {heading}
          </Typography>
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
