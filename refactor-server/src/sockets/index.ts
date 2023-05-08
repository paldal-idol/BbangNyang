import { Server as SocketServer, ServerOptions } from 'socket.io';
import { Server } from 'http';
import roomHandler from './controller/room';

const socketServer = (server: Server, option: Partial<ServerOptions>) => {
  const io = new SocketServer(server, option);

  io.on('connection', (socket) => {
    roomHandler(io, socket);
  });
};

export default socketServer;
