import { Theme, createStyles, makeStyles } from '@material-ui/core'
import type { Props } from './Card'

export const useStyles = makeStyles<
  Theme,
  Pick<Props, 'faction' | 'inclusionReason'> & { isDone: boolean }
>((theme) =>
  createStyles({
    root: {
      transition: 'opacity 0.2s ease-in-out',
      border: ({ faction, inclusionReason }) => {
        if (faction) return `1px solid ${theme.palette[faction].light}`
        if (inclusionReason) return `1px solid ${theme.palette.secondary.light}`
        return `1px solid ${theme.palette.grey[100]}`
      },
      boxShadow: ({ faction, inclusionReason }) => {
        if (faction) return `0px 30px 15px -20px ${theme.palette[faction].main}`
        if (inclusionReason)
          return `0px 30px 15px -20px ${theme.palette.secondary.main}`
        return `0px 30px 15px -20px ${theme.palette.grey[200]}`
      },
      backgroundImage: ({ faction, inclusionReason }) => {
        if (faction)
          return `linear-gradient(175deg, ${theme.palette[faction].main}, ${theme.palette[faction].dark})`
        if (inclusionReason)
          return `linear-gradient(175deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
        return `linear-gradient(175deg, ${theme.palette.common.white}, ${theme.palette.grey[100]})`
      },
      '& *': {
        color: ({ faction, inclusionReason }) => {
          if (faction) return theme.palette[faction].contrastText
          if (inclusionReason) return theme.palette.secondary.contrastText
          return theme.palette.common.black
        }
      },
      position: 'relative',
      overflow: 'hidden',
      padding: theme.spacing(3),
      borderRadius: 5,
      WebkitFontSmoothing: 'antialiased'
    },
    header: {
      width: '100%',
      display: 'flex'
    },
    icon: {
      fontSize: theme.typography.pxToRem(16),
      position: 'relative',
      bottom: 2,
      marginLeft: theme.spacing(0.3)
    },
    watermark: {
      marginRight: theme.spacing(1.5),
      position: 'absolute',
      right: '15%',
      top: '15%',
      fillOpacity: 0.2,
      width: 60,
      height: 60,
      transform: 'scale(10)',
      fill: ({ faction }) =>
        faction ? theme.palette[faction].dark : theme.palette.common.black
    },
    button: {
      position: 'absolute',
      borderColor: ({ faction }) =>
        faction ? theme.palette[faction].contrastText : undefined,
      color: ({ faction }) =>
        faction
          ? theme.palette[faction].contrastText
          : theme.palette.common.white,
      right: 20,
      bottom: ({ isDone }) => (isDone ? 20 : 5),
      zIndex: 10
    },
    bodyContainer: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
      position: 'relative',
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2)
      },
      '& > *': {
        textAlign: 'justify'
      }
    }
  })
)
