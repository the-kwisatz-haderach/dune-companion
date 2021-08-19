import { createContext, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useSnackBarContext from '../SnackbarContext'
import { hostActions } from '@dune-companion/engine'
import { DunePlayerClient } from '../../DunePlayerClient'

const CONNECTION_URL = `ws://localhost:8000`

export type IWebsocketContext = Pick<
  DunePlayerClient,
  'connect' | 'isConnected' | 'disconnect' | 'dispatchAction'
> & {
  getClientId: () => string
}

export const WebsocketContext = createContext<IWebsocketContext>({
  getClientId: () => '',
  isConnected: () => false,
  connect: async () => {},
  disconnect: async () => {},
  dispatchAction: async () => {}
})

const getClientId = () => window.sessionStorage.getItem('clientId') ?? ''
const setClientId = (clientId: string) =>
  window.sessionStorage.setItem('clientId', clientId)

export const WebsocketProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showSnack } = useSnackBarContext()

  const duneClient = useMemo(
    () =>
      new DunePlayerClient({
        hostUrl: CONNECTION_URL,
        clientIdStore: {
          get: () => window.sessionStorage.getItem('clientId') ?? '',
          set: (clientId: string) =>
            window.sessionStorage.setItem('clientId', clientId),
          clear: () => window.sessionStorage.removeItem('clientId')
        },
        eventHandlers: {
          CONNECTION_CLOSED_BY_CLIENT: () => {
            showSnack('Disconnected from server.')
          },
          CONNECTION_CLOSED_BY_HOST: event => {
            showSnack(event.reason, 'info')
          },
          CONNECTION_OPENED: () => {
            console.log(`Successfully connected to ${CONNECTION_URL}.`)
          },
          ERROR: event => {
            showSnack(event.message, 'error')
          },
          INCOMING_MESSAGE: action => {
            switch (action.type) {
              case 'CLIENT_CONNECTED':
                setClientId(action.payload.clientId)
                break
              case 'GAME_CREATED':
                history.push(`/game/${action.payload.roomId}`)
                showSnack(
                  `Created game room ${action.payload.roomId}.`,
                  'success'
                )
                break
              case 'GAME_JOINED':
                history.push(`/game/${action.payload.roomId}`)
                showSnack(
                  `Joined game room ${action.payload.roomId}.`,
                  'success'
                )
                break
              case 'SHOW_NOTIFICATION':
                showSnack(action.payload.message, action.payload.type)
                break
              case 'GAME_UPDATED':
                dispatch(hostActions.GAME_UPDATED(action.payload))
                break
              default:
                console.log('Unhandled Action')
                console.log(action)
            }
          }
        }
      }),
    [showSnack, dispatch, history]
  )

  const value = useMemo(
    () => ({
      getClientId,
      disconnect: duneClient.disconnect.bind(duneClient),
      connect: duneClient.connect.bind(duneClient),
      dispatchAction: duneClient.dispatchAction.bind(duneClient),
      isConnected: duneClient.isConnected.bind(duneClient)
    }),
    [duneClient]
  )

  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  )
}
