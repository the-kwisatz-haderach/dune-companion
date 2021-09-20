import { ReactElement, useCallback, useMemo, useState } from 'react'
import { Box, Typography, Collapse, Button } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import { MetaText } from '../Typography/MetaText'
import { Factions } from '@dune-companion/engine'
import { factionIcons } from '../../lib/factionIcons'
import { createDoubleTapHandler } from '../../lib/doubleTapHandler'
import { useStyles } from './styles'

export interface Props {
  title: string
  body: string
  meta: string
  faction?: Factions
  advanced?: boolean
  inclusionReason?: string
}

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

  const toggleCompleteCard = useCallback(() => {
    setIsDone(curr => !curr)
  }, [])

  const handleDoubleTap = useMemo(
    () => createDoubleTapHandler(toggleCompleteCard),
    [toggleCompleteCard]
  )

  return (
    <Box
      className={classes.root}
      onTouchStart={e => handleDoubleTap(e.timeStamp)}
    >
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
