import { createContext, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import useSnackBarContext from '../../contexts/SnackbarContext'
import { hostActions } from '@dune-companion/engine'
import { DunePlayerClient } from '../client/DunePlayerClient'
import { createStore } from '../store'
import { IClientIdStore } from '../client/types'

const store = createStore()

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

type Props = {
  hostUrl: string
  clientIdStore: IClientIdStore
}

export const WebsocketProvider: React.FC<Props> = ({
  children,
  hostUrl,
  clientIdStore
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showSnack } = useSnackBarContext()

  const duneClient = useMemo(
    () =>
      new DunePlayerClient({
        hostUrl,
        clientIdStore,
        eventHandlers: {
          CONNECTION_CLOSED_BY_CLIENT: () =>
            showSnack('Disconnected from server.'),
          CONNECTION_REOPENED: () =>
            showSnack('Reopened connection.', 'success'),
          CONNECTION_CLOSED_BY_HOST: reason => showSnack(reason, 'info'),
          CONNECTION_OPENED: () => showSnack('Connected to server.', 'success'),
          ERROR: message => showSnack(message, 'error'),
          INCOMING_MESSAGE: action => {
            switch (action.type) {
              case 'CLIENT_CONNECTED':
                clientIdStore.set(action.payload.clientId)
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
    [showSnack, dispatch, history, hostUrl, clientIdStore]
  )

  const value = useMemo(
    () => ({
      getClientId: clientIdStore.get.bind(clientIdStore),
      disconnect: duneClient.disconnect.bind(duneClient),
      connect: duneClient.connect.bind(duneClient),
      dispatchAction: duneClient.dispatchAction.bind(duneClient),
      isConnected: duneClient.isConnected.bind(duneClient)
    }),
    [duneClient, clientIdStore]
  )

  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  )
}

export const DuneProvider: React.FC<Props> = ({ children, ...props }) => (
  <Provider store={store}>
    <WebsocketProvider {...props}>{children}</WebsocketProvider>
  </Provider>
)
