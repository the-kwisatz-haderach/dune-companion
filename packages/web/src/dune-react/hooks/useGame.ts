import { Game } from '@dune-companion/engine'
import { useSelector } from 'react-redux'

export const useGame = (): Game => useSelector((state: Game) => state)
