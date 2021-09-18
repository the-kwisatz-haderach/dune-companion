import { ComponentType, useLayoutEffect, useRef, useState } from 'react'
import { Box, createStyles, Fade, makeStyles } from '@material-ui/core'

type TransitionOptions = {
  timeInOut?: number
  timeDuring?: number
  delayTime?: number
}

const useStyles = makeStyles(() =>
  createStyles({
    loaderWrapper: {
      position: 'relative',
      zIndex: 1000
    }
  })
)

const defaultOptions: TransitionOptions = {
  timeDuring: 3500,
  timeInOut: 1000,
  delayTime: 0
}

interface TransitionProps {
  trigger: unknown
}

export const withTransition = <T extends object>(
  Component: ComponentType<T>,
  Loader: ComponentType<T>,
  {
    timeDuring = defaultOptions.timeDuring,
    timeInOut = defaultOptions.timeInOut,
    delayTime = defaultOptions.delayTime
  } = defaultOptions
) => {
  return ({ trigger, ...componentProps }: T & TransitionProps) => {
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
      /* eslint-disable-next-line */
    }, [trigger])

    return (
      <>
        <Fade in={!transition} timeout={timeInOut}>
          <Box position="relative">
            {transition ? (
              <Component {...(props.current as T)} />
            ) : (
              <Component {...(componentProps as T)} />
            )}
          </Box>
        </Fade>
        <Fade
          in={transition}
          timeout={timeInOut}
          unmountOnExit
          style={{ transitionDelay: `${delayTime}ms` }}
        >
          <Box className={classes.loaderWrapper}>
            <Loader {...(componentProps as T)} />
          </Box>
        </Fade>
      </>
    )
  }
}
