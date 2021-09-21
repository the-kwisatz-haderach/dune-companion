import { ClientActionType } from '../actions'

export type CommonProps = { label: string }

export type StaticPlayerActionProperties = Partial<
  Record<ClientActionType, CommonProps>
>

export type DynamicPlayerActionProperties = {
  RESPOND_TO_ALLIANCE_REQUEST: { id: string }
}

export type PlayerAction<T extends ClientActionType = ClientActionType> = {
  type: T
} & StaticPlayerActionProperties[T] &
  (T extends keyof DynamicPlayerActionProperties
    ? DynamicPlayerActionProperties[T]
    : never)

export type PlayerActionCollection = {
  primary: PlayerAction[]
  secondary: PlayerAction[]
}
