import { AvailableActionDetails } from '../models'
import { ClientActionType } from '../actions/clientActions'
import { actionLabels } from '../dictionaries'

export const getAvailableActionDetails = (
  type: ClientActionType
): AvailableActionDetails => ({
  label: actionLabels[type],
  style: 'cancel'
})
