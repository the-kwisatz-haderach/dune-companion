import { ClientActionType } from '../actions'
import { Player } from './player'

export type AvailableActionStyle = 'confirm' | 'cancel'

export type AvailableActionDetails = {
  label: string
  style: AvailableActionStyle
}

export type AvailableActionCollection = {
  primary: ClientActionType[]
  secondary: ClientActionType[]
}

export type AvailablePlayerActionsMap = Record<
  Player['id'],
  AvailableActionCollection
>
