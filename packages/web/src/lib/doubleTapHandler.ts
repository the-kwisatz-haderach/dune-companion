export function createDoubleTapHandler(cb: () => void) {
  let lastTimestamp: number | undefined
  return (timestamp: number) => {
    if (lastTimestamp && timestamp - 500 < lastTimestamp) {
      lastTimestamp = undefined
      return cb()
    }
    lastTimestamp = timestamp
  }
}
