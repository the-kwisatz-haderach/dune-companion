import { Game, Player } from '@dune-companion/engine'
import { useSelector } from 'react-redux'
import { useWebsocketContext } from './useWebsocketContext'

export const usePlayer = (): Player => {
  const { getClientId } = useWebsocketContext()
  return useSelector(
    (state: Game) =>
      state.players[getClientId()] ?? {
        id: '',
        isAdmin: false,
        faction: null,
        name: '',
        spice: 0,
        treacheryCards: 0,
        hasCompletedPhase: false
      }
  )
}
