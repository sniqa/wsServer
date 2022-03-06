import { WebSocket } from "ws"

const connectMap = new Map<string, WebSocket>()

export const addConnection = (account: string, conn: WebSocket) => {
  !connectMap.get(account) && connectMap.set(account, conn)
}

export const delConnection = (account: string) => {
  connectMap.get(account) && connectMap.delete(account)
}

export const getConnection = (account: string) => {
  return connectMap.get(account)
}
