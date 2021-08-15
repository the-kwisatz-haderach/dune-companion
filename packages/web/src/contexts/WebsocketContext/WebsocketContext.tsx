import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import ReconnectingWebSocket from 'reconnecting-websocket'
import useSnackBarContext from '../SnackbarContext'
import {
  clientActions,
  ClientActionType,
  HostAction
} from '@dune-companion/engine'

export type IWebsocketContext = {
  isConnected: () => boolean
  connect: () => Promise<void>
  disconnect: () => void
  sendMessage: <T extends ClientActionType>(
    type: T,
    payload: Omit<ReturnType<typeof clientActions[T]>['payload'], 'playerId'>
  ) => Promise<void>
}

export const WebsocketContext = createContext<IWebsocketContext>({
  isConnected: () => false,
  connect: async () => {},
  disconnect: () => {},
  sendMessage: async () => {}
})

const parseAction = (data: any): HostAction => JSON.parse(data)

const CONNECTION_URL = `ws://localhost:8000`

export const WebsocketProvider: React.FC = ({ children }) => {
  const isConnected = useRef(false)
  const websocket = useRef<ReconnectingWebSocket | null>(null)
  const history = useHistory()
  const { showSnack } = useSnackBarContext()

  const createConnection = () => {
    websocket.current = new ReconnectingWebSocket(
      `${CONNECTION_URL}?clientId=${window.sessionStorage.getItem('playerId') ??
        ''}`
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
          window.sessionStorage.setItem('playerId', action.payload.clientId)
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
        default:
          console.log('other')
          console.log(action)
      }
    }

    websocket.current.onclose = event => {
      isConnected.current = false
      showSnack(event.reason, 'error')
    }
  }, [history, showSnack])

  const disconnect = useCallback(() => {
    websocket.current?.close()
    websocket.current = null
    showSnack('Disconnected from server.')
  }, [showSnack])

  const sendMessage = useCallback<IWebsocketContext['sendMessage']>(
    async (type, payload) => {
      const playerId = window.sessionStorage.getItem('playerId')
      if (playerId) {
        websocket.current?.send(
          JSON.stringify(
            clientActions[type]({
              ...payload,
              playerId
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
