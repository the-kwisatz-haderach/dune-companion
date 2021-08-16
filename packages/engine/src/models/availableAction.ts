import type { ClientActionType } from "../actions"
import { Player } from "./player"

export type AvailableAction = {
  label: string
  type: ClientActionType
}

export type AvailableActionsCollection = {
  primary: AvailableAction[]
  secondary: AvailableAction[]
}

export type AvailableActionsMap = Record<
  Player['id'],
  AvailableActionsCollection
>