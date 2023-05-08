import { Server as SocketServer, ServerOptions } from 'socket.io';
import { Server } from 'http';
import roomHandler from './controller/room';
import userHandler from './controller/user';

const socketServer = (server: Server, option: Partial<ServerOptions>) => {
  const io = new SocketServer(server, option);

  io.on('connection', (socket) => {
    roomHandler(io, socket);
    userHandler(io, socket);
  });
};

export default socketServer;
