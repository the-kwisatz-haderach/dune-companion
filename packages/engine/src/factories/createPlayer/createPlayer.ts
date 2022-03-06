import { Player } from '../../models'

type ICreatePlayerOptions = {
  isAdmin?: boolean
}

export const createPlayer = (
  id: string,
  options?: ICreatePlayerOptions
): Player => ({
  id,
  name: '',
  isAdmin: options?.isAdmin ?? false,
  faction: null,
  spice: 0,
  treacheryCards: 0,
  hasCompletedPhase: false,
  isIdle: false
})
