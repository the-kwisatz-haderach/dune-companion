import { ClientActionType } from '../actions'

export const actionLabels: Record<ClientActionType, string> = {
  CONFIRM_ALLIANCE: 'Confirm',
  CREATE_GAME: 'Create game',
  JOIN_GAME: 'Join game',
  LEAVE_GAME: 'Leave game',
  REQUEST_ALLIANCE: 'Request alliance',
  SELECT_FACTION: 'Select faction',
  SET_ADMIN: 'Set admin',
  SET_PLAYER_ORDER: 'Set player order',
  SET_IS_NOT_READY: 'Not ready',
  SET_IS_READY: 'Ready',
  UPDATE_PLAYER_NAME: 'Update name'
}
