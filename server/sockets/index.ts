const io = require('socket.io');
const socketIO = io();

const { chatSocket } = require('./chat');
const { gameSocket } = require('./game');
const { userSocket } = require('./user');
const { waitingRoomSocket } = require('./waitingRoom');

const { methods } = require('../store/users.ts');
const { removeUser } = require('../services/waitingRoom');

socketIO.on('connect', (socket: any) => {
  console.log(`user( ${socket.id} ) is connected`);

  chatSocket(socketIO, socket);
  gameSocket(socketIO, socket);
  userSocket(socketIO, socket);
  waitingRoomSocket(socketIO, socket);

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(`${socket.id} has left`);
    if (user) {
      socketIO.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });
      socketIO.to(user.room).emit('roomData', {
        room: user.room,
        users: methods.getUsersInRoom(user.room),
      });
    }
  });
});

export default socketIO;
