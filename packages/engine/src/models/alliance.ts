import { Player } from './player'

export type Alliance = {
  players: Player['id'][]
}

export type AllianceRequest = {
  requester: Player['id']
  responders: Player['id'][]
}

export type AllianceRequestResponse = { response: 'accept' | 'decline' }
