import { Player } from './player'
import { Auction } from './auction'
import { Alliance, AllianceRequest } from './alliance'
import { Notification } from './notification'
import { phases } from '../library/constants/phases'
import { ClientActionType } from '../actions'

export type Conditions = {
  advancedMode: boolean
  maxPlayers: number
  maxTurns: number
}

export type AvailableActions = Record<Player['id'], ClientActionType[]>

export type Game = {
  conditions: Conditions
  currentPhase: number
  currentTurn: number
  currentFirstPlayer: number
  awaitingAction: (keyof Game['players'])[]
  playerOrder: (keyof Game['players'])[]
  actions: AvailableActions
  players: Record<string, Player>
  phases: typeof phases
  auctions: Auction[]
  notifications: Notification[]
  allianceRequests: AllianceRequest[]
  alliances: Alliance[]
}
