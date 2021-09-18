import { useEffect, useState } from 'react'

type Options = {
  disabled?: boolean
}

export const useDelayedState = (
  value: any,
  delay: number,
  options?: Options
) => {
  const [delayedValue, setDelayedValue] = useState(value)
  useEffect(() => {
    if (options?.disabled) return
    const timeout = setTimeout(() => {
      setDelayedValue(value)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay, options?.disabled])
  return options?.disabled ? value : delayedValue
}
