import { Player } from './player'

export type Alliance = {
  players: Player['id'][]
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
