import { Player } from './player'

export type Alliance = {
  players: Player['id'][]
  status: 'confirmed' | 'pending'
}

export type AllianceRequest = {
  id: string
  requester: Player['id']
  responders: Player['id'][]
}

export type AllianceRequestResponse = {
  id: AllianceRequest['id']
  response: 'accept' | 'decline'
}
