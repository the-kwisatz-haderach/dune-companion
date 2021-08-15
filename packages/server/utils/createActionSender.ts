import WebSocket from 'ws'
import { hostActions, HostActionType } from '@dune-companion/engine'

export const createActionSender = (socket: WebSocket) => async <
  T extends HostActionType
>(
  type: T,
  payload: ReturnType<typeof hostActions[T]>['payload']
) => socket.send(JSON.stringify(hostActions[type](payload as any)))
