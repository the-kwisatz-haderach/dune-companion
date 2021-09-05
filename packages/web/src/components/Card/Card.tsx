import { ReactElement } from 'react'
import {
  Theme,
  Box,
  createStyles,
  makeStyles,
  Typography,
  Collapse,
  Button
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import { MetaText } from '../Typography/MetaText'
import { Factions } from '@dune-companion/engine'
import { factionIcons } from '../../lib/factionIcons'
import { useState } from 'react'

interface Props {
  title: string
  body: string
  meta: string
  faction?: Factions
  advanced?: boolean
  inclusionReason?: string
}

const useStyles = makeStyles<
  Theme,
  Pick<Props, 'faction' | 'inclusionReason'> & { isDone: boolean }
>(theme =>
  createStyles({
    root: {
      transition: 'opacity 0.2s ease-in-out',
      opacity: ({ isDone }) => `${isDone ? 0.7 : 1}`,
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
      bottom: ({ isDone }) => (isDone ? 20 : 10),
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

export default function Card({
  title,
  body,
  meta,
  faction,
  inclusionReason,
  advanced = false
}: Props): ReactElement {
  const [isDone, setIsDone] = useState(false)
  const classes = useStyles({ faction, inclusionReason, isDone })
  const Icon = faction ? factionIcons[faction] : undefined

  const toggleCompleteCard = () => {
    setIsDone(curr => !curr)
  }

  return (
    <Box className={classes.root}>
      {Icon && <Icon className={classes.watermark} />}
      <Box className={classes.header}>
        <Box
          zIndex={1}
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Collapse in={!isDone} unmountOnExit>
            <Box
              flex={1}
              mb={1}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <MetaText size="small">{meta}</MetaText>
              {(advanced || inclusionReason) && (
                <Box display="flex" position="relative">
                  <MetaText size="small">
                    {inclusionReason || 'Advanced'}
                  </MetaText>
                  <StarIcon className={classes.icon} />
                </Box>
              )}
            </Box>
          </Collapse>
          <Box display="flex">
            <Typography variant="h4">{title}</Typography>
          </Box>
        </Box>
      </Box>
      <Collapse in={!isDone} unmountOnExit>
        <Box className={classes.bodyContainer}>
          {body.split('\n').map((paragraph, index) => (
            <Typography key={index} variant="body2">
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Collapse>
      <Button
        variant={isDone ? 'outlined' : 'text'}
        size="small"
        className={classes.button}
        onClick={toggleCompleteCard}
      >
        {isDone ? 'REDO' : 'DONE'}
      </Button>
    </Box>
  )
}
