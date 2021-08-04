import { PlayerActionType } from './actions'
import { Player } from './player'

export type Play = Record<Player['id'], PlayerActionType[]>
