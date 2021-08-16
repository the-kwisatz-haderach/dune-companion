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
    isReady: false,
    isAdmin,
    faction: null,
    spice: 0,
    treacheryCards: 0,
    primaryActions: [],
    secondaryActions: []
  }
}
