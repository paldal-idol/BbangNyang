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
const { checkNumberOfUsers, addUser, removeUser, getUser, getUsersInRoom, checkRoom, changeUser } = require('./socket/users.ts');
const {generateName} = require('./game/nameGenerator');

io.on('connect', (socket: any) => {
  socket.on('join', ({ name , room }: any, callback: any) => {
    if(checkNumberOfUsers(room)===false){
      callback(true);
    }
    console.log(`join user : ${name}, room : ${room}`);
    const { error, user } = addUser({ id: socket.id, name, room });
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
    console.log(`${socket.id} has left`);
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

  socket.on('changeName', (name: string, callback: any)=>{
    const user = getUser(socket.id);
    const oldName = user.name;
    changeUserName(socket.id, name);
    const users = getUsersInRoom(user.room);
    console.log(users);

    socket.broadcast
    .to(user.room)
    .emit('changeUsers', {users:users});
    
    socket.emit('message', {
      user: 'admin',
      text: `${oldName}, success name change to ${name}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${oldName} changed name to ${name}` });

    callback();
  })
});



app.get('/makeRoom', (req: any, res: any) => {
  res.send({code:roomCodeGenerator(),name:generateName()});
});

app.get('/getName', (req:any,res:any)=>{
  res.send({name:generateName()});
})

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`listening on port : ${port}`);
});

// app.listen(port, () => console.log(`listening on port ${port}`));
