import WebSocket from 'ws'
import { HostAction } from '@dune-companion/engine'

export const createActionSender =
  (socket: WebSocket) =>
  async (action: HostAction): Promise<void> =>
    socket.send(JSON.stringify(action))
