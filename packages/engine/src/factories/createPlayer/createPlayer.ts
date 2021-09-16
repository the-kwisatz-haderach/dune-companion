import { Player } from '../../models'
import { getPhaseActionProperties } from '../getPhaseActionProperties'

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
  actions: getPhaseActionProperties('FACTION_SELECT', options?.isAdmin)
})
