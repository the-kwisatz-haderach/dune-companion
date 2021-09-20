import { Player } from './player'
import { Auction } from './auction'
import { Alliance, AllianceRequest } from './alliance'
import { Conditions } from './conditions'
import { Phases, PhaseStates } from './phase'

export type Game = {
  conditions: Conditions
  currentPhase: Phases
  currentTurn: number
  currentFirstPlayer: number | null
  playerOrder: Player['id'][]
  players: Record<Player['id'], Player>
  auctions: Auction[]
  allianceRequests: AllianceRequest[]
  alliances: Alliance[]
  phaseStates: PhaseStates
}
