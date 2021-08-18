import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ReconnectingWebSocket from 'reconnecting-websocket'
import useSnackBarContext from '../SnackbarContext'
import {
  clientActions,
  ClientActionType,
  HostAction,
  hostActions
} from '@dune-companion/engine'

export type IWebsocketContext = {
  getClientId: () => string
  isConnected: () => boolean
  connect: () => Promise<void>
  disconnect: () => void
  sendMessage: <T extends ClientActionType>(
    type: T,
    payload: Omit<ReturnType<typeof clientActions[T]>['payload'], 'playerId'>
  ) => Promise<void>
}

export const WebsocketContext = createContext<IWebsocketContext>({
  getClientId: () => '',
  isConnected: () => false,
  connect: async () => {},
  disconnect: () => {},
  sendMessage: async () => {}
})

const parseAction = (data: any): HostAction => JSON.parse(data)

const CONNECTION_URL = `ws://localhost:8000`
const getClientId = () => window.sessionStorage.getItem('clientId') ?? ''
const setClientId = (clientId: string) =>
  window.sessionStorage.setItem('clientId', clientId)
const getSocketUrl = async () => `${CONNECTION_URL}?clientId=${getClientId()}`

export const WebsocketProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showSnack } = useSnackBarContext()
  const websocket = useRef<ReconnectingWebSocket>(
    new ReconnectingWebSocket(getSocketUrl, undefined, {
      startClosed: true
    })
  )

  const isConnected = useCallback(
    () => websocket.current.readyState === ReconnectingWebSocket.OPEN,
    []
  )

  const connect = useCallback<IWebsocketContext['connect']>(async () => {
    if (!isConnected()) {
      websocket.current.reconnect()
    }

    websocket.current.onopen = () => {
      console.log(`Successfully connected to ${CONNECTION_URL}.`)
    }

    websocket.current.onmessage = event => {
      const action = parseAction(event.data)
      switch (action.type) {
        case 'CLIENT_CONNECTED':
          setClientId(action.payload.clientId)
          break
        case 'GAME_CREATED':
          console.log('created', action)
          history.push(`/game/${action.payload.roomId}`)
          showSnack(`Created game room ${action.payload.roomId}.`, 'success')
          break
        case 'GAME_JOINED':
          console.log('joined', action)
          history.push(`/game/${action.payload.roomId}`)
          showSnack(`Joined game room ${action.payload.roomId}.`, 'success')
          break
        case 'SHOW_NOTIFICATION':
          showSnack(action.payload.message, action.payload.type)
          break
        case 'GAME_UPDATED':
          dispatch(hostActions.GAME_UPDATED(action.payload))
          break
        default:
          console.log('other')
          console.log(action)
      }
    }

    websocket.current.onerror = event => {
      showSnack(event.message, 'error')
    }

    websocket.current.onclose = event => {
      showSnack(event.reason, 'info')
    }
  }, [dispatch, history, showSnack, isConnected])

  const disconnect = useCallback(() => {
    websocket.current.close()
    showSnack('Disconnected from server.')
  }, [showSnack])

  const sendMessage = useCallback<IWebsocketContext['sendMessage']>(
    async (type, payload) => {
      const clientId = getClientId()
      if (clientId) {
        websocket.current.send(
          JSON.stringify(
            clientActions[type]({
              ...payload,
              playerId: clientId
            } as any)
          )
        )
      }
    },
    []
  )

  useEffect(() => disconnect, [disconnect])

  const value = useMemo(
    () => ({
      disconnect,
      connect,
      sendMessage,
      isConnected,
      getClientId
    }),
    [isConnected, disconnect, connect, sendMessage]
  )

  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  )
}
