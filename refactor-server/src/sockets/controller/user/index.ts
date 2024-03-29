import { Server as SocketServer, Socket } from 'socket.io';
import { rooms } from '../../../stores';
import USER_EVENT from './eventType';
import ROOM_EVENT from '../room/eventType';

const userHandler = (io: SocketServer, socket: Socket) => {
  socket.on(USER_EVENT.CHANGE_CHARACTER, ({ character, roomCode }, callback: Function) => {
    if (!roomCode) {
      return callback('잘못된 접근입니다!');
    }

    const id = socket.id;
    const room = rooms[roomCode];
    const user = room.getUserById(id);
    user.changeCharacter(character);

    io.to(roomCode).emit(ROOM_EVENT.ROOM_DATA, room);
    callback('success', user);
  });

  socket.on(USER_EVENT.CHANGE_NAME, ({ name, roomCode }, callback: Function) => {
    if (!roomCode) {
      return callback('잘못된 접근입니다!');
    }
    const id = socket.id;
    const room = rooms[roomCode];
    const user = room.getUserById(id);
    user.changeName(name);

    io.to(roomCode).emit(ROOM_EVENT.ROOM_DATA, room);
    callback('success', user);
  });
};

export default userHandler;
