import { useContext } from 'react'
import { WebsocketProvider, WebsocketContext } from './WebsocketContext'

export { WebsocketProvider }

export default function useWebsocketContext() {
  return useContext(WebsocketContext)
}
