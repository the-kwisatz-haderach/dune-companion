import { Player } from './player'
import { Auction } from './auction'
import { Alliance, AllianceRequest } from './alliance'
import { Notification } from './notification'
import { ClientActionType } from '../actions'
import { Phase, Phases } from './phase'

export type Conditions = {
  advancedMode: boolean
  maxPlayers: number
  maxTurns: number
}

export type AvailableActions = Record<
  Player['id'],
  {
    primary: ClientActionType
    secondary: ClientActionType[]
  }
>

export type Game = {
  conditions: Conditions
  currentPhase: number
  currentTurn: number
  currentFirstPlayer: number
  awaitingAction: Player['id'][]
  playerOrder: Player['id'][]
  availableActions: AvailableActions
  players: Record<Player['id'], Player>
  phases: Record<Phases, Phase>
  auctions: Auction[]
  notifications: Notification[]
  allianceRequests: AllianceRequest[]
  alliances: Alliance[]
}
