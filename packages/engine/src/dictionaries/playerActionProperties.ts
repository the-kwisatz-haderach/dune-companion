import { StaticPlayerActionProperties } from '../models'

export const playerActionProperties: StaticPlayerActionProperties = {
  RESPOND_TO_ALLIANCE_REQUEST: {
    style: 'neutral',
    isPrimary: false,
    label: 'Respond'
  },
  CREATE_GAME: {
    style: 'neutral',
    isPrimary: false,
    label: 'Create game'
  },
  JOIN_GAME: { style: 'neutral', isPrimary: false, label: 'Join game' },
  LEAVE_GAME: {
    style: 'neutral',
    isPrimary: false,
    label: 'Leave game'
  },
  REQUEST_ALLIANCE: {
    style: 'neutral',
    isPrimary: false,
    label: 'Request alliance'
  },
  SELECT_FACTION: {
    style: 'neutral',
    isPrimary: false,
    label: 'Select faction'
  },
  SET_ADMIN: {
    style: 'neutral',
    isPrimary: false,
    label: 'Update admin'
  },
  SET_PLAYER_ORDER: {
    style: 'neutral',
    isPrimary: true,
    label: 'Set player order'
  },
  SET_IS_NOT_READY: {
    style: 'negative',
    isPrimary: true,
    label: 'Not ready'
  },
  SET_IS_READY: { style: 'positive', isPrimary: true, label: 'Ready' },
  UPDATE_PLAYER_NAME: {
    style: 'neutral',
    isPrimary: true,
    label: 'Update name'
  },
  MARK_PHASE_STEP_COMPLETED: {
    style: 'neutral',
    isPrimary: false,
    label: 'Complete'
  },
  MARK_PHASE_STEP_NOT_COMPLETED: {
    style: 'neutral',
    isPrimary: false,
    label: 'Not Completed'
  },
  DECLARE_AS_WINNER: {
    style: 'neutral',
    isPrimary: false,
    label: 'Declare winner'
  },
  CONFIRM_WINNER: {
    style: 'neutral',
    isPrimary: false,
    label: 'Confirm winner'
  },
  SET_PLAYER_SPICE: {
    style: 'neutral',
    isPrimary: false,
    label: 'Update spice'
  },
  SET_PLAYER_TREACHERY_CARDS: {
    style: 'neutral',
    isPrimary: false,
    label: 'Update cards'
  },
  SET_FIRST_PLAYER: {
    style: 'neutral',
    isPrimary: true,
    label: 'Set first player'
  },
  SKIP_BID: { style: 'negative', isPrimary: true, label: 'Skip bid' },
  PLACE_BID: { style: 'positive', isPrimary: true, label: 'Place bid' },
  GO_TO_NEXUS: { style: 'neutral', isPrimary: true, label: 'Go to Nexus' },
  SET_IDLE_STATUS: {
    style: 'neutral',
    isPrimary: false,
    label: 'Set idle status'
  }
}
