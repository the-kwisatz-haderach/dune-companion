import { Player } from './player'

export type Alliance = {
  players: Player['id'][]
}

export type AllianceRequest = {
  requester: Player['id']
  responder: Player['id']
}
