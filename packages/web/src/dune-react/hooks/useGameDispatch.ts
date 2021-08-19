import { useWebsocketContext } from './useWebsocketContext'

export const useGameDispatch = () => useWebsocketContext().dispatchAction
