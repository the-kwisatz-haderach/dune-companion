import { phases, Phases } from '@dune-companion/engine'
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'

type Props = {
  phase: Phases
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundImage: `linear-gradient(-40deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      width: '100%',
      height: '100vh',
      backgroundSize: '500% 500%',
      animation: `$gradient 1.5s 1s ${theme.transitions.easing.easeInOut} forwards`,
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center'
    },
    title: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      marginTop: theme.spacing(2),
      textTransform: 'capitalize',
      color: theme.palette.primary.contrastText,
      opacity: 0,
      fontSize: theme.typography.pxToRem(56),
      lineHeight: 1,
      animation: `$fadeIn 1s 1.5s ${theme.transitions.easing.easeInOut} forwards`
    },
    meta: {
      color: theme.palette.primary.contrastText,
      transform: 'translateX(-100vw)',
      animation: `$slideInOut 4s ${theme.transitions.easing.sharp} forwards`
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: '0% 0%'
      },
      '100%': {
        backgroundPosition: '100% 100%'
      }
    },
    '@keyframes slideInOut': {
      '0%': {
        transform: 'translateX(-100vw)'
      },
      '30%': {
        transform: 'translateX(0%)'
      },
      '60%': {
        transform: 'translateX(0%)'
      },
      '100%': {
        transform: 'translateX(100vw)'
      }
    }
  })
)

export const Loading: React.FC<Props> = ({ phase }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      {phase !== 'SETUP' && phase !== 'STORM' && (
        <Typography className={classes.meta} variant="caption">
          New phase
        </Typography>
      )}
      <Typography className={classes.title} variant="subtitle2">
        {phase === 'STORM'
          ? 'New Turn'
          : phase === 'SETUP'
          ? 'Setup'
          : phases[phase].name}
      </Typography>
    </Box>
  )
}
