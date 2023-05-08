import { Server as SocketServer, Socket } from 'socket.io';
import { rooms } from '../../../stores';
import CHAT_EVENT from './eventType';

const userHandler = (io: SocketServer, socket: Socket) => {
  socket.on(CHAT_EVENT.SEND, ({ message, roomCode }) => {
    const id = socket.id;
    const room = rooms[roomCode];
    const user = room.getUserById(id);

    io.to(roomCode).emit(CHAT_EVENT.MESSAGE, { user, text: message });
  });
};

export default userHandler;
