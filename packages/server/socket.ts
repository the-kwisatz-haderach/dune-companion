import WebSocket, { ServerOptions } from "ws";

export const createWebsocketServer = (server: ServerOptions["server"]) => {
  const wsServer = new WebSocket.Server({ server });
  return wsServer;
};
