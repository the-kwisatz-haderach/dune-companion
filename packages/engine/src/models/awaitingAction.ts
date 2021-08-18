import { ClientActionType } from '../actions'
import { Player } from './player'

export type AwaitingAction = {
  playerId: Player['id']
  type: ClientActionType
  relatedPlayers?: Player['id'][]
}
