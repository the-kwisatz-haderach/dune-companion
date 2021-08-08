import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import ReconnectingWebSocket from 'reconnecting-websocket'

export const useWebsocketSubscription = () => {
  const websocket = useRef<ReconnectingWebSocket | null>(null)
  const [roomId, setRoomId] = useState('')
  const queryClient = useQueryClient()

  const connect = useCallback((roomId: string) => {
    setRoomId(roomId)
  }, [])

  const disconnect = useCallback(() => {
    websocket.current?.close()
    websocket.current = null
  }, [])

  const sendMessage = useCallback((message: any) => {
    websocket.current?.send(message)
  }, [])

  useEffect(() => {
    if (roomId === '') {
      websocket.current = null
      return
    }

    websocket.current = new ReconnectingWebSocket(
      `ws://localhost:8000?id=${roomId}`
    )

    websocket.current.onopen = () => {
      console.log('connected')
    }
    websocket.current.onmessage = event => {
      const data = JSON.parse(event.data)
      console.log(data)
      queryClient.setQueriesData(data.entity, oldData => {
        const update = (entity: any) =>
          entity.id === data.id ? { ...entity, ...data.payload } : entity
        return Array.isArray(oldData) ? oldData.map(update) : update(oldData)
      })
    }

    return () => {
      websocket?.current?.close()
    }
  }, [queryClient, roomId])

  return { connect, disconnect, sendMessage }
}
