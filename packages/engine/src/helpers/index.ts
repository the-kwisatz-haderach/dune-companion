export const append = <T>(items: T[], key: T): T[] => [...items, key]

export const pull = <T>(items: T[], key: T): T[] =>
  items.filter(item => item !== key)

export const omit = <T extends Record<string, unknown>>(
  object: T,
  property: keyof T
) => {
  const cloned = { ...object }
  delete cloned[property]
  return cloned
}
