import React from 'react'
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme, { overlap: number }>(theme =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      height: '100%',
      borderRadius: '40px 40px 0px 0px',
      backgroundColor: theme.palette.common.white,
      position: 'relative',
      top: ({ overlap }) => -overlap
    }
  })
)

type Props = {
  overlap?: number
}

export const RoundedContainer: React.FC<Props> = ({
  children,
  overlap = 40
}) => {
  const classes = useStyles({ overlap })
  return <Box className={classes.root}>{children}</Box>
}
