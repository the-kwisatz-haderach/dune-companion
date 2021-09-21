import { Player } from './player'
import { Auction } from './auction'
import { Alliance, AllianceRequest } from './alliance'
import { Phases, PhaseStates } from './phase'

export type Game = {
  isAdvancedMode: boolean
  maxPlayers: number
  maxTurns: number
  currentPhase: Phases
  currentTurn: number
  currentFirstPlayer: number | null
  playerOrder: Array<Player['id']>
  players: Record<Player['id'], Player>
  auctions: Auction[]
  isRunningTimer: boolean
  allianceRequests: AllianceRequest[]
  alliances: Alliance[]
  phaseStates: PhaseStates
}
