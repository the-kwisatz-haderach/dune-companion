import { Factions } from './faction'

export type Player = {
  id: string
  isAdmin: boolean
  faction: Factions | null
  name: string
  spice: number
  treacheryCards: number
}
