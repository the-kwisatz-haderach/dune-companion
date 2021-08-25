import { ReactElement } from 'react'
import {
  Theme,
  Box,
  createStyles,
  makeStyles,
  Typography
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import hawk from '../../images/hawk.jpeg'
import { MetaText } from '../Typography/MetaText'
import { Factions } from '@dune-companion/engine'
import { createFactionStyles } from '../../theme'

type CardType = 'phase' | 'faction'

interface Props {
  title: string
  body: string
  type: 'phase' | 'faction'
  faction?: Factions
  advanced?: boolean
}

const useStyles = makeStyles<Theme, { faction?: Factions }>(theme =>
  createStyles({
    root: {
      ...createFactionStyles(theme),
      padding: theme.spacing(3),
      borderRadius: 10
    },
    header: {
      width: '100%',
      display: 'flex',
      marginBottom: theme.spacing(1.5)
    },
    small: {
      fontSize: theme.typography.pxToRem(10)
    },
    icon: {
      fontSize: theme.typography.pxToRem(16),
      position: 'relative',
      bottom: 2,
      marginLeft: theme.spacing(0.3)
    },
    img: {
      marginRight: theme.spacing(1.5)
    },
    bodyContainer: {
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(1)
      },
      '& > *': {
        textAlign: 'justify'
      }
    }
  })
)

const getImageSrc = (type: CardType): string => {
  switch (type) {
    default:
      return hawk
  }
}

export default function Card({
  title,
  body,
  type,
  faction,
  advanced = false
}: Props): ReactElement {
  const classes = useStyles({ faction })
  const imgSrc = getImageSrc(type)
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <img
          width={45}
          height={45}
          src={imgSrc}
          alt={title}
          className={classes.img}
        />
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            flex={1}
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <MetaText size="small">{type} rule</MetaText>
            {advanced && (
              <Box display="flex" position="relative">
                <MetaText size="small">Advanced</MetaText>
                <StarIcon className={classes.icon} />
              </Box>
            )}
          </Box>
          <Typography variant="h4">{title}</Typography>
        </Box>
      </Box>
      <Box className={classes.bodyContainer}>
        {body.split('\n').map(paragraph => (
          <Typography variant="body2">{paragraph}</Typography>
        ))}
      </Box>
    </Box>
  )
}
