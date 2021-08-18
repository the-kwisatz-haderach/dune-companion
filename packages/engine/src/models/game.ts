import { Player } from './player'
import { Auction } from './auction'
import { Alliance, AllianceRequest } from './alliance'
import { Conditions } from './conditions'
import { Phases, PhaseStates } from './phase'
import { AwaitingAction } from './awaitingAction'

export type Game = {
  isFinished: boolean
  conditions: Conditions
  currentPhase: Phases
  currentTurn: number
  currentFirstPlayer: number
  awaitingActions: AwaitingAction[]
  playerOrder: Player['id'][]
  players: Record<Player['id'], Player>
  auctions: Auction[]
  allianceRequests: AllianceRequest[]
  alliances: Alliance[]
  phaseStates: PhaseStates
}
