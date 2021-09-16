import { ClientActionType } from '../actions'
import { playerActionDetails } from '../dictionaries'
import {
  DynamicPlayerActionProperties,
  PlayerAction,
  StaticPlayerActionProperties
} from '../models'

export function getActionProperties<
  T extends keyof DynamicPlayerActionProperties
>(type: T, additional: DynamicPlayerActionProperties[T]): PlayerAction<T>

export function getActionProperties<
  T extends Exclude<
    keyof StaticPlayerActionProperties,
    keyof DynamicPlayerActionProperties
  >
>(type: T, additional?: never): PlayerAction<T>

export function getActionProperties<T extends ClientActionType>(
  type: T,
  additional: any
): PlayerAction<T> {
  return {
    type,
    ...playerActionDetails[type],
    ...additional
  }
}
