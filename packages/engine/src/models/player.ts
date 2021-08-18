import { Factions } from './faction'
import { ClientActionType } from '../actions'

export type Player = {
  id: string
  isAdmin: boolean
  faction: Factions | null
  name: string
  spice: number
  treacheryCards: number
  actions: ClientActionType[]
}
