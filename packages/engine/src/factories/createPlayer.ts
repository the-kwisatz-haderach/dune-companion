import {
  requiredPhaseActions,
  requiredPhaseAdminActions
} from '../dictionaries'
import { Player } from '../models'
import { createPlayerAction } from './createPlayerAction'

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
  actions: [
    ...requiredPhaseActions.SETUP.map(type => createPlayerAction(type)),
    ...(options?.isAdmin
      ? requiredPhaseAdminActions.SETUP.map(type => createPlayerAction(type))
      : [])
  ]
})
