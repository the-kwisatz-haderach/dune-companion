import { playerActionProperties } from '@dune-companion/engine'
import { useMemo } from 'react'
import usePromptContext from '../../contexts/PromptContext'
import { useGameDispatch } from './useGameDispatch'

// type ICreateActionHandlerMap = (dependencies: {
//   dispatch: ReturnType<typeof useGameDispatch>
//   showPrompt: ReturnType<typeof usePromptContext>
// }) => {
//   [K in ClientActionType]?: {
//     handler: () => void
//     style: 'positive' | 'negative'
//     label: string
//   }
// }

const createActionHandlers = ({
  dispatch,
  showPrompt
}: {
  dispatch: ReturnType<typeof useGameDispatch>
  showPrompt: ReturnType<typeof usePromptContext>
}) =>
  ({
    SET_IS_READY: {
      ...playerActionProperties['SET_IS_READY'],
      handler: () => dispatch('SET_IS_READY', {})
    },
    SET_IS_NOT_READY: {
      ...playerActionProperties['SET_IS_NOT_READY'],
      handler: () => dispatch('SET_IS_NOT_READY', {})
    },
    SET_PLAYER_ORDER: {
      ...playerActionProperties['SET_PLAYER_ORDER'],
      handler: () => showPrompt('SetPlayerOrderPrompt', {})
    },
    UPDATE_PLAYER_NAME: {
      ...playerActionProperties['UPDATE_PLAYER_NAME'],
      handler: () => showPrompt('PlayerSetupPrompt', {})
    },
    SET_FIRST_PLAYER: {
      ...playerActionProperties['SET_FIRST_PLAYER'],
      handler: () => showPrompt('SetCurrentFirstPlayerPrompt', {})
    },
    SET_PLAYER_SPICE: {
      ...playerActionProperties['SET_PLAYER_SPICE'],
      handler: () => showPrompt('SetPlayerSpicePrompt', {})
    },
    SET_PLAYER_TREACHERY_CARDS: {
      ...playerActionProperties['SET_PLAYER_TREACHERY_CARDS'],
      handler: () => showPrompt('SetPlayerTreacheryCardsPrompt', {})
    },
    GO_TO_NEXUS: {
      ...playerActionProperties['GO_TO_NEXUS'],
      handler: () => dispatch('GO_TO_NEXUS', {})
    },
    SKIP_BID: {
      ...playerActionProperties['SKIP_BID'],
      handler: () => dispatch('SKIP_BID', {})
    },
    REQUEST_ALLIANCE: {
      ...playerActionProperties['REQUEST_ALLIANCE'],
      handler: () =>
        showPrompt('SimplePrompt', {
          title: 'Request Alliance',
          closable: true,
          children: 'Hello',
          primaryAction: {
            label: 'Send request',
            onClick: () => console.log('clicked me')
          }
        })
    }
    // SET_ADMIN: {
    //   handler: (id: string) => dispatch('SET_ADMIN', { id }),
    //   style: 'positive',
    //   label: actionLabels['SET_ADMIN']
    // },
    // RESPOND_TO_ALLIANCE_REQUEST: {
    //   handler: () => dispatch('RESPOND_TO_ALLIANCE_REQUEST', {}),
    //   style: 'positive',
    //   label: actionLabels['RESPOND_TO_ALLIANCE_REQUEST']
    // },
    // SELECT_FACTION: {
    //   handler: () => dispatch('SELECT_FACTION', {}),
    //   style: 'positive',
    //   label: actionLabels['SELECT_FACTION']
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
    // PLACE_BID: {
    //   handler: () => dispatch('PLACE_BID', {}),
    //   style: 'positive',
    //   label: actionLabels['PLACE_BID']
    // },
  } as const)

export const useGameActions = () => {
  const dispatch = useGameDispatch()
  const showPrompt = usePromptContext()
  return useMemo(
    () => createActionHandlers({ dispatch, showPrompt }),
    [dispatch, showPrompt]
  )
}
