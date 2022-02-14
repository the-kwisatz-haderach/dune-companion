import {
  Box,
  BoxProps,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'

interface Props extends BoxProps {
  spacing?: number
}

const useStyles = makeStyles<Theme, Pick<Props, 'spacing' | 'flexDirection'>>(
  () =>
    createStyles({
      root: {
        display: 'flex',
        '& > *:not(:last-child)': {
          marginBottom: ({ flexDirection, spacing }) =>
            flexDirection === 'column' ? spacing : 0,
          marginRight: ({ flexDirection, spacing }) =>
            flexDirection === 'row' ? spacing : 0
        }
      }
    })
)

export const Flex: React.FC<Props> = ({
  spacing,
  flexDirection,
  children,
  ...boxProps
}) => {
  const classes = useStyles({ spacing, flexDirection })
  return (
    <Box {...boxProps} flexDirection={flexDirection} className={classes.root}>
      {children}
    </Box>
  )
}
