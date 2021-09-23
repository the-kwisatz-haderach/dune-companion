import { StaticPlayerActionProperties } from '../models'

export const playerActionProperties: StaticPlayerActionProperties = {
  RESPOND_TO_ALLIANCE_REQUEST: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Respond'
  },
  CREATE_GAME: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Create game'
  },
  JOIN_GAME: { style: 'neutral', actionType: 'secondary', label: 'Join game' },
  LEAVE_GAME: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Leave game'
  },
  REQUEST_ALLIANCE: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Request alliance'
  },
  SELECT_FACTION: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Select faction'
  },
  SET_ADMIN: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Update admin'
  },
  SET_PLAYER_ORDER: {
    style: 'neutral',
    actionType: 'primary',
    label: 'Set player order'
  },
  SET_IS_NOT_READY: {
    style: 'negative',
    actionType: 'primary',
    label: 'Not ready'
  },
  SET_IS_READY: { style: 'positive', actionType: 'primary', label: 'Ready' },
  UPDATE_PLAYER_NAME: {
    style: 'neutral',
    actionType: 'primary',
    label: 'Update name'
  },
  MARK_PHASE_STEP_COMPLETED: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Complete'
  },
  MARK_PHASE_STEP_NOT_COMPLETED: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Not Completed'
  },
  DECLARE_AS_WINNER: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Declare winner'
  },
  CONFIRM_WINNER: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Confirm winner'
  },
  SET_PLAYER_SPICE: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Update spice'
  },
  SET_PLAYER_TREACHERY_CARDS: {
    style: 'neutral',
    actionType: 'secondary',
    label: 'Update cards'
  },
  SET_FIRST_PLAYER: {
    style: 'neutral',
    actionType: 'primary',
    label: 'Set first player'
  },
  SKIP_BID: { style: 'negative', actionType: 'primary', label: 'Skip bid' },
  PLACE_BID: { style: 'positive', actionType: 'primary', label: 'Place bid' },
  GO_TO_NEXUS: { style: 'neutral', actionType: 'primary', label: 'Go to Nexus' }
}
