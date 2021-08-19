import { useWebsocketContext } from './useWebsocketContext'

export const useGameConnection = () => {
  const { connect, disconnect, isConnected } = useWebsocketContext()
  return { connect, disconnect, isConnected }
}
