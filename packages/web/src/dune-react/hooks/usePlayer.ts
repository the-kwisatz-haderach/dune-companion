import { Game, Player } from '@dune-companion/engine'
import { useSelector } from 'react-redux'
import { useWebsocketContext } from './useWebsocketContext'

export const usePlayer = (): Player => {
  const { getClientId } = useWebsocketContext()
  return useSelector((state: Game) => state.players[getClientId()])
}
