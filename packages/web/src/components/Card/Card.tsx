import { ReactElement } from 'react'
import {
  Theme,
  Box,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import { MetaText } from '../Typography/MetaText'
import { Factions, Phases } from '@dune-companion/engine'
import { createFactionStyles } from '../../theme'
import { factionIcons } from '../../lib/factionIcons'

interface Props {
  title: string
  body: string
  meta: string
  phase?: Phases
  faction?: Factions
  advanced?: boolean
}

const useStyles = makeStyles<Theme, { faction?: Factions }>(theme =>
  createStyles({
    root: {
      ...createFactionStyles(theme),
      position: 'relative',
      overflow: 'hidden',
      padding: theme.spacing(3),
      borderRadius: 5,
      WebkitFontSmoothing: 'antialiased'
    },
    header: {
      width: '100%',
      display: 'flex',
      marginBottom: theme.spacing(1.5)
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
    bodyContainer: {
      position: 'relative',
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(1)
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
  phase,
  faction,
  advanced = false
}: Props): ReactElement {
  const classes = useStyles({ faction })
  const Icon = faction ? factionIcons[faction] : undefined
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
          <Box
            flex={1}
            mb={1}
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <MetaText size="small">{meta}</MetaText>
            {advanced && (
              <Box display="flex" position="relative">
                <MetaText size="small">Advanced</MetaText>
                <StarIcon className={classes.icon} />
              </Box>
            )}
          </Box>
          <Box display="flex">
            <Typography variant="h4">{title}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.bodyContainer}>
        {body.split('\n').map((paragraph, index) => (
          <Typography key={index} variant="body2">
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
