export const createAction = <
  P extends Record<string, unknown> | void = void,
  T extends string = string
>(
  type: T
) => (payload: P) => ({
  type,
  payload
})
