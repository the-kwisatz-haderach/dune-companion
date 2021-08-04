import { Player } from '../../models'

export function createPlayer({
  id,
  name,
  isAdmin = false
}: {
  id: string
  name: string
  isAdmin?: boolean
}): Player {
  return {
    id,
    name,
    isAdmin,
    faction: null,
    spice: 0,
    treacheryCards: 0
  }
}
