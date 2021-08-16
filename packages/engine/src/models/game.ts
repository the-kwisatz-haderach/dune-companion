import { Player } from './player'
import { Auction } from './auction'
import { Alliance, AllianceRequest } from './alliance'
import { Notification } from './notification'
import { AvailableActionsMap } from './availableAction'
import { Conditions } from './conditions'

export type Game = {
  conditions: Conditions
  currentPhase: number
  currentTurn: number
  currentFirstPlayer: number
  awaitingAction: Player['id'][]
  playerOrder: Player['id'][]
  availableActions: AvailableActionsMap
  players: Record<Player['id'], Player>
  auctions: Auction[]
  notifications: Notification[]
  allianceRequests: AllianceRequest[]
  alliances: Alliance[]
}
