import { useContext } from 'react'
import { WebsocketContext } from '../Context/DuneContext'

export const useWebsocketContext = () => useContext(WebsocketContext)
