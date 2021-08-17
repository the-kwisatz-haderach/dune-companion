import { Player } from './player'
import { Auction } from './auction'
import { Alliance, AllianceRequest } from './alliance'
import { Conditions } from './conditions'
import { Phases, PhaseStates } from './phase'

export type Game = {
  isFinished: boolean
  conditions: Conditions
  currentPhase: Phases
  currentTurn: number
  currentFirstPlayer: number
  awaitingAction: Player['id'][]
  playerOrder: Player['id'][]
  players: Record<Player['id'], Player>
  auctions: Auction[]
  allianceRequests: AllianceRequest[]
  alliances: Alliance[]
  phaseStates: PhaseStates
}
