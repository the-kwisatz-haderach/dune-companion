import { Factions } from './faction'
import { ClientActionType } from '../actions'

export type CommonProps = { isRequired?: boolean }

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

export type Player = {
  id: string
  isAdmin: boolean
  faction: Factions | null
  name: string
  spice: number
  treacheryCards: number
  actions: PlayerAction[]
}
