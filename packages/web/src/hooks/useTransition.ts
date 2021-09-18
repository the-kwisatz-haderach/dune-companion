import { useLayoutEffect, useState } from 'react'

type Options = {
  duration: number
  delay?: number
  condition?: boolean
}

export const useTransition = (
  trigger: unknown,
  { duration, delay = 0, condition = true }: Options
) => {
  const [transition, setTransition] = useState(false)

  useLayoutEffect(() => {
    if (!condition) return
    let transitionTimer: NodeJS.Timeout
    let delayTimer: NodeJS.Timeout
    delayTimer = setTimeout(() => {
      setTransition(true)
      transitionTimer = setTimeout(() => {
        setTransition(false)
      }, duration)
    }, delay)
    return () => {
      clearTimeout(delayTimer)
      clearTimeout(transitionTimer)
    }
  }, [trigger, duration, delay, condition])
  return transition
}
