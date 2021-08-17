import { Player } from '../models'

export function createPlayer({
  id,
  isAdmin = false
}: {
  id: string
  isAdmin?: boolean
}): Player {
  return {
    id,
    name: '',
    isAdmin,
    faction: null,
    spice: 0,
    treacheryCards: 0
  }
}
