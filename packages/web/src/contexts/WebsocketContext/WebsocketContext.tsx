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

export const WebsocketProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const isConnected = useRef(false)
  const clientId = useRef(window.sessionStorage.getItem('clientId'))
  const websocket = useRef<ReconnectingWebSocket | null>(null)
  const history = useHistory()
  const { showSnack } = useSnackBarContext()

  const createConnection = () => {
    websocket.current = new ReconnectingWebSocket(
      `${CONNECTION_URL}?clientId=${clientId.current ?? ''}`
    )
  }

  const connect = useCallback<IWebsocketContext['connect']>(async () => {
    if (!isConnected.current) {
      createConnection()
    }
    if (!websocket.current) return

    websocket.current.onopen = () => {
      console.log(`Successfully connected to ${CONNECTION_URL}.`)
      isConnected.current = true
    }

    websocket.current.onmessage = event => {
      const action = parseAction(event.data)
      switch (action.type) {
        case 'CLIENT_CONNECTED':
          window.sessionStorage.setItem('clientId', action.payload.clientId)
          break
        case 'GAME_CREATED':
          history.push(`/game/${action.payload.roomId}`)
          showSnack(`Created game room ${action.payload.roomId}.`, 'success')
          break
        case 'GAME_JOINED':
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

    websocket.current.onclose = event => {
      isConnected.current = false
      showSnack(event.reason, 'error')
    }
  }, [dispatch, history, showSnack])

  const disconnect = useCallback(() => {
    websocket.current?.close()
    websocket.current = null
    showSnack('Disconnected from server.')
  }, [showSnack])

  const sendMessage = useCallback<IWebsocketContext['sendMessage']>(
    async (type, payload) => {
      if (clientId.current) {
        websocket.current?.send(
          JSON.stringify(
            clientActions[type]({
              ...payload,
              playerId: clientId.current
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
      getClientId: () => clientId.current ?? '',
      isConnected: () => isConnected.current
    }),
    [disconnect, connect, sendMessage]
  )

  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  )
}
