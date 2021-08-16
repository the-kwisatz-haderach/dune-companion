import type { ClientActionType } from "../actions"
import { Factions } from './faction'

export type AvailableAction = {
  label: string
  type: ClientActionType
}

export type Player = {
  id: string
  isAdmin: boolean
  isReady: boolean
  faction: Factions | null
  name: string
  spice: number
  treacheryCards: number
  primaryActions: AvailableAction[]
  secondaryActions: AvailableAction[]
}
