import type { ClientActionType } from "../actions"
import { Player } from "./player"

export type AvailableAction = {
  primary: ClientActionType[]
  secondary: ClientActionType[]
}

export type AvailableActionsMap = Record<
  Player['id'],
  AvailableAction
>