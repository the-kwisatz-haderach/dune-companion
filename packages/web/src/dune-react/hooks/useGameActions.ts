import { actionLabels, ClientActionType } from '@dune-companion/engine'
import { useMemo } from 'react'
import usePromptContext from '../../contexts/PromptContext'
import { useGameDispatch } from './useGameDispatch'

type ICreateActionHandlerMap = (dependencies: {
  dispatch: ReturnType<typeof useGameDispatch>
  showPrompt: ReturnType<typeof usePromptContext>
}) => {
  [K in ClientActionType]?: {
    handler: () => void
    style: 'positive' | 'negative'
    label: string
  }
}

const createActionHandlers: ICreateActionHandlerMap = ({
  dispatch,
  showPrompt
}) => ({
  SET_IS_READY: {
    handler: () => dispatch('SET_IS_READY', {}),
    style: 'positive',
    label: actionLabels['SET_IS_READY']
  },
  SET_IS_NOT_READY: {
    handler: () => dispatch('SET_IS_NOT_READY', {}),
    style: 'negative',
    label: actionLabels['SET_IS_NOT_READY']
  },
  SET_PLAYER_ORDER: {
    handler: () => showPrompt('SetPlayerOrderPrompt', {}),
    style: 'positive',
    label: actionLabels['SET_PLAYER_ORDER']
  },
  UPDATE_PLAYER_NAME: {
    handler: () => showPrompt('PlayerSetupPrompt', {}),
    style: 'positive',
    label: actionLabels['UPDATE_PLAYER_NAME']
  },
  SET_FIRST_PLAYER: {
    handler: () => showPrompt('SetCurrentFirstPlayerPrompt', {}),
    style: 'positive',
    label: actionLabels['SET_FIRST_PLAYER']
  },
  // RESPOND_TO_ALLIANCE_REQUEST: {
  //   handler: () => dispatch('RESPOND_TO_ALLIANCE_REQUEST', {}),
  //   style: 'positive',
  //   label: actionLabels['RESPOND_TO_ALLIANCE_REQUEST']
  // },
  // LEAVE_GAME: {
  //   handler: () => dispatch('LEAVE_GAME', {}),
  //   style: 'negative',
  //   label: actionLabels['LEAVE_GAME']
  // },
  // REQUEST_ALLIANCE: {
  //   handler: () => dispatch('REQUEST_ALLIANCE', {}),
  //   style: 'positive',
  //   label: actionLabels['REQUEST_ALLIANCE']
  // },
  // SELECT_FACTION: {
  //   handler: () => dispatch('SELECT_FACTION', {}),
  //   style: 'positive',
  //   label: actionLabels['SELECT_FACTION']
  // },
  // SET_ADMIN: {
  //   handler: () => dispatch('SET_ADMIN', {}),
  //   style: 'positive',
  //   label: actionLabels['SET_ADMIN']
  // },
  // MARK_PHASE_STEP_COMPLETED: {
  //   handler: () => dispatch('MARK_PHASE_STEP_COMPLETED', {}),
  //   style: 'positive',
  //   label: actionLabels['MARK_PHASE_STEP_COMPLETED']
  // },
  // MARK_PHASE_STEP_NOT_COMPLETED: {
  //   handler: () => dispatch('MARK_PHASE_STEP_NOT_COMPLETED', {}),
  //   style: 'negative',
  //   label: actionLabels['MARK_PHASE_STEP_NOT_COMPLETED']
  // },
  // DECLARE_AS_WINNER: {
  //   handler: () => dispatch('DECLARE_AS_WINNER', {}),
  //   style: 'positive',
  //   label: actionLabels['DECLARE_AS_WINNER']
  // },
  // CONFIRM_WINNER: {
  //   handler: () => dispatch('CONFIRM_WINNER', {}),
  //   style: 'positive',
  //   label: actionLabels['CONFIRM_WINNER']
  // },
  // SET_PLAYER_SPICE: {
  //   handler: () => dispatch('SET_PLAYER_SPICE', {}),
  //   style: 'positive',
  //   label: actionLabels['SET_PLAYER_SPICE']
  // },
  // SET_PLAYER_TREACHERY_CARDS: {
  //   handler: () => dispatch('SET_PLAYER_TREACHERY_CARDS', {}),
  //   style: 'positive',
  //   label: actionLabels['SET_PLAYER_TREACHERY_CARDS']
  // },
  // SKIP_BID: {
  //   handler: () => dispatch('SKIP_BID', {}),
  //   style: 'negative',
  //   label: actionLabels['SKIP_BID']
  // },
  // PLACE_BID: {
  //   handler: () => dispatch('PLACE_BID', {}),
  //   style: 'positive',
  //   label: actionLabels['PLACE_BID']
  // },
  START_AUCTION: {
    handler: () => dispatch('START_AUCTION', {}),
    style: 'positive',
    label: actionLabels['START_AUCTION']
  }
})

export const useGameActions = () => {
  const dispatch = useGameDispatch()
  const showPrompt = usePromptContext()
  return useMemo(() => createActionHandlers({ dispatch, showPrompt }), [
    dispatch,
    showPrompt
  ])
}