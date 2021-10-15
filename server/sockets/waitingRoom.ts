import { methods } from '../store/users';

const {
  addUser,
  removeUser,
  changeUserReady,
  isAllReady,
  getRound,
  setRound,
} = require('../services/waitingRoom');
const { isValidNumberOfUsers, isExistRoom } = require('../services/roomEntry');
const { getRandomCharacter } = require('../utils/characterSelector');

const waitingRoomSocket = (socketIO: any, socket: any) => {
  socket.on('kickOutUser', (user: any) => {
    socketIO.to(user.room).emit('kickOutUserId', user.name);
    socketIO.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has been kicked out.`,
    });
  });
  socket.on('checkRoom', (roomCode: string) => {
    const check = isExistRoom(roomCode);
    if (check) {
      if (isValidNumberOfUsers(roomCode) === false) {
        socket.emit('fullRoom');
      } else {
        console.log('이거야', getRound(roomCode));
        socket.emit('existRoom', getRound(roomCode));
      }
    } else {
      socket.emit('nonExistRoom');
    }
  });

  socket.on('changeRound', (round: Number) => {
    const user = methods.getUser(socket.id) ?? { room: 0 };
    setRound(user.room, round);
    socketIO.to(user.room).emit('changedRound', round);
  });

  socket.on('ready', (readyState: boolean, callback: any) => {
    const user = methods.getUser(socket.id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }
    changeUserReady(socket.id, readyState);

    //모든 사용자에게 사용자 상태 전달
    socketIO.to(user.room).emit('roomData', {
      room: user.room,
      users: methods.getUsersInRoom(user.room),
    });
  });

  socket.on('gameStart', () => {
    const user = methods.getUser(socket.id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }
    let status = isAllReady();

    switch (status) {
      case 200:
        socketIO.to(user.room).emit('startEvent');
        break;
      case 401:
        socket.emit('listenEvent', '준비를 안한 사용자가 있습니다.');
        break;
      case 402:
        socket.emit('listenEvent', '사용자가 부족합니다.');
        break;
    }
  });

  socket.on('join', ({ name, room }: any, callback: any) => {
    console.log(`join user : ${socket.id}, room : ${room}`);

    if (!room) {
      return callback('잘못된 접근입니다!');
    }

    const randomCharacter = getRandomCharacter(methods.getUsersInRoom(room));
    const { error, user } = addUser({
      id: socket.id,
      name: name,
      room: room,
      isReady: false,
      character: randomCharacter,
    });

    if (error) {
      return callback('방이 꽉 찼습니다!');
    }

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });

    socketIO.to(user.room).emit('roomData', {
      room: user.room,
      round: getRound(user.room),
      users: methods.getUsersInRoom(user.room),
    });

    callback();
  });
};

module.exports = { waitingRoomSocket };
