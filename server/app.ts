import { resolveSoa } from 'dns/promises';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');

const indexRouter = require('./router/index');
app.use(indexRouter);

const corsOptions = {
  cors: true,
  origins: [process.env.CLIENT || 'http://localhost:3000'],
};
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, corsOptions);

const { roomCodeGenerator } = require('./game/roomCodeGenerator.ts');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  changeUserName,
  changeUserReady,
  changeUserCharacter,
  isValidNumberOfUsers,
  isExistRoom,
  isAllReady,
} = require('./socket/users.ts');
const { generateName } = require('./game/nameGenerator');
const { getRandomCharacter } = require('./game/characterSelector');

io.on('connect', (socket: any) => {
  socket.on('checkRoom', (roomCode: string) => {
    const check = isExistRoom(roomCode);
    if (check) {
      if (isValidNumberOfUsers(roomCode) === false) {
        socket.emit('fullRoom');
      } else {
        socket.emit('existRoom');
      }
    } else {
      socket.emit('nonExistRoom');
    }
  });

  socket.on('join', ({ name, room }: any, callback: any) => {
    console.log(`join user : ${name}, room : ${room}`);
    const randomCharacter = getRandomCharacter(getUsersInRoom(room));
    console.log(randomCharacter);
    const { error, user } = addUser({ id: socket.id, name, room, character: randomCharacter });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message: any, callback: any) => {
    const user = getUser(socket.id);
    //모든 사용자에게 메시지 전달
    io.to(user.room).emit('message', { user: user, text: message });

    callback();
  });

  socket.on('ready', (readyState: boolean, callback: any) => {
    const user = getUser(socket.id);

    changeUserReady(socket.id, readyState);

    //모든 사용자에게 사용자 상태 전달
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(`${socket.id} has left`);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on('changeName', (name: string, callback: any) => {
    const user = getUser(socket.id);
    const oldName = user.name;
    changeUserName(socket.id, name);
    const users = getUsersInRoom(user.room);
    console.log(users);

    socket.emit('changeUsers', { users: users });

    socket.emit('message', {
      user: 'admin',
      text: `${oldName}, success name change to ${name}.`,
    });

    socket.broadcast.to(user.room).emit('changeUsers', { users: users });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${oldName} changed name to ${name}` });

    callback();
  });

  socket.on('changeCharacter', (character: number, callback: any) => {
    const user = getUser(socket.id);
    console.log(character);
    const error = changeUserCharacter(socket.id, character);

    if (error) {
      console.log(error);
    }
    const users = getUsersInRoom(user.room);
    console.log(users);

    socket.broadcast.to(user.room).emit('changeUsers', { users: users });
    callback();
  });

  socket.on('gameStart', () => {
    const user = getUser(socket.id);
    let status = isAllReady();

    switch (status) {
      case 200:
        io.to(user.room).emit('startEvent');
        break;
      case 401:
        socket.emit('listenEvent', '준비를 안한 사용자가 있습니다.');
        break;
      case 402:
        socket.emit('listenEvent', '사용자가 부족합니다.');
        break;
    }
  });

  socket.on('kickOutUser', (user: any) => {
    io.to(user.room).emit('kickOutUserId', user.name);
    io.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has been kicked out.`,
    });
  });
});

app.get('/makeRoom', (req: any, res: any) => {
  res.send({ code: roomCodeGenerator(), name: generateName() });
});

app.get('/getName', (req: any, res: any) => {
  res.send({ name: generateName() });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
