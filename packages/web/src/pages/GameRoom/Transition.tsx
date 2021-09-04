import { ComponentType, useLayoutEffect, useRef, useState } from 'react'
import { Box, createStyles, Fade, makeStyles } from '@material-ui/core'

type Props<T extends Record<string, unknown>> = {
  Component: ComponentType<T>
  Loader: ComponentType<T>
  componentProps: T
  trigger: unknown
  timeInOut?: number
  timeDuring?: number
}

const useStyles = makeStyles(() =>
  createStyles({
    loaderWrapper: {
      position: 'relative',
      zIndex: 1000
    }
  })
)

export function Transition<T extends Record<string, unknown>>({
  Component,
  componentProps,
  trigger,
  Loader,
  timeDuring = 3500,
  timeInOut = 1000
}: Props<T>) {
  const classes = useStyles()
  const props = useRef(componentProps)
  const [transition, setTransition] = useState(false)

  useLayoutEffect(() => {
    setTransition(true)
    const timer = setTimeout(() => {
      props.current = componentProps
      setTransition(false)
    }, timeDuring)
    return () => {
      clearTimeout(timer)
    }
  }, [trigger, componentProps, timeDuring])

  return (
    <>
      <Fade in={!transition} timeout={timeInOut}>
        <Component {...props.current} />
      </Fade>
      <Fade in={transition} timeout={timeInOut} unmountOnExit>
        <Box className={classes.loaderWrapper}>
          <Loader {...componentProps} />
        </Box>
      </Fade>
    </>
  )
}
