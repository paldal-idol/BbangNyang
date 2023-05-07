import { Server as SocketServer, ServerOptions } from 'socket.io';
import { Server } from 'http';

const socket = (server: Server, option: Partial<ServerOptions>) => {
  const io = new SocketServer(server, option);

  io.on('connection', () => {});
};

export default socket;
