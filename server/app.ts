require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const corsOptions = {
  cors: true,
  origins: [process.env.CLIENT || 'http://localhost:3000'],
};
const io = socketio(server, corsOptions);

const indexRouter = require('./router/index');

app.use(indexRouter);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./socket/users.tsx');

io.on('connect', (socket: any) => {
  socket.on('join', ({ name, room }: any, callback: any) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(room);
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
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`listening on port : ${port}`);
});

// app.listen(port, () => console.log(`listening on port ${port}`));
