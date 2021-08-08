import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'
import { useQueryClient } from 'react-query'
import ReconnectingWebSocket from 'reconnecting-websocket'

export type IWebsocketContext = {
  connect: (roomId: string) => void
  disconnect: () => void
  sendMessage: <T extends { type: string; payload: Record<string, unknown> }>(
    message: T
  ) => void
}

export const WebsocketContext = createContext<IWebsocketContext>({
  connect: () => {},
  disconnect: () => {},
  sendMessage: () => {}
})

export const WebsocketProvider: React.FC = ({ children }) => {
  const websocket = useRef<ReconnectingWebSocket | null>(null)
  const queryClient = useQueryClient()

  const connect = useCallback(
    (roomId: string) => {
      if (roomId === '') return

      websocket.current = new ReconnectingWebSocket(
        `ws://localhost:8000?id=${roomId}`
      )

      websocket.current.onopen = () => {
        console.log('connected')
      }

      websocket.current.onmessage = event => {
        const data = JSON.parse(event.data)

        console.log(data)

        if (data.type === 'CONNECTION') {
          window.sessionStorage.setItem('playerId', data.payload.playerId)
          return
        }

        queryClient.setQueriesData(data.entity, oldData => {
          const update = (entity: any) =>
            entity.id === data.id ? { ...entity, ...data.payload } : entity
          return Array.isArray(oldData) ? oldData.map(update) : update(oldData)
        })
      }
    },
    [queryClient]
  )

  const disconnect = useCallback(() => {
    websocket.current?.close()
    websocket.current = null
  }, [])

  const sendMessage = useCallback(
    <T extends { type: string; payload: Record<string, unknown> }>(
      message: T
    ) => {
      websocket.current?.send(
        JSON.stringify({
          ...message,
          payload: {
            ...message.payload,
            playerId: window.sessionStorage.getItem('playerId')
          }
        })
      )
    },
    []
  )

  useEffect(() => disconnect, [disconnect])

  const value = useMemo(
    () => ({
      disconnect,
      connect,
      sendMessage
    }),
    [disconnect, connect, sendMessage]
  )

  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  )
}
