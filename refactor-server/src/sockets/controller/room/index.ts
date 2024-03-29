import { Server as SocketServer, Socket } from 'socket.io';
import ROOM_EVENT from './eventType';
import User from '../../domain/user';
import { rooms } from '../../../stores';
import { getRandomCharacter } from '../../services/user';

const roomHandler = (io: SocketServer, socket: Socket) => {
  socket.on(ROOM_EVENT.JOIN, ({ name, roomCode }, callback: Function) => {
    if (!roomCode) {
      return callback('잘못된 접근입니다!');
    }

    const id = socket.id;
    const room = rooms[roomCode];
    const character = getRandomCharacter(room.users);

    // TODO: 정원초과 로직 추가 필요
    //socket.emit('alarm', '정원이 초과되었습니다.');

    const user = new User({
      id,
      name,
      roomCode,
      character,
    });

    room.addUser(user);

    socket.join(user.roomCode);

    io.to(roomCode).emit(ROOM_EVENT.ROOM_DATA, room);
    callback('success', user);
  });

  socket.on(ROOM_EVENT.READY, ({ readyState, roomCode }, callback: Function) => {
    const id = socket.id;
    const room = rooms[roomCode];
    const user = room.getUserById(id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }

    user.changeReadyStatus(readyState);

    io.to(roomCode).emit(ROOM_EVENT.ROOM_DATA, room);
    callback('success', user);
  });

  socket.on(ROOM_EVENT.GAME_START, ({ roomCode }) => {
    const room = rooms[roomCode];

    if (room.checkAllReady()) {
      io.to(roomCode).emit(ROOM_EVENT.GAME_START);
    } else {
      socket.emit('message', { type: 'admin', text: '게임을 시작할 수 없습니다.' });
    }
  });

  socket.on(ROOM_EVENT.CHANGE_ROUND, ({ round, roomCode }) => {
    const room = rooms[roomCode];
    room.setRound(round);

    io.to(roomCode).emit(ROOM_EVENT.ROOM_DATA, room);
  });

  socket.on(ROOM_EVENT.KICK_OUT, ({ id, roomCode }) => {
    const room = rooms[roomCode];
    const user = room.getUserById(id);

    room.removeUser(user);

    const kickedUserSocket = io.sockets.sockets.get(id);

    io.sockets.sockets.get(id).leave(roomCode);
    kickedUserSocket.emit(ROOM_EVENT.KICK_OUT);
    io.to(roomCode).emit(ROOM_EVENT.ROOM_DATA, room);
  });
};

export default roomHandler;
