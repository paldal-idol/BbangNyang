import { methods } from '../store/users';

const { changeUserName, changeUserCharacter } = require('../services/waitingRoom');

const userSocket = (socketIO: any, socket: any) => {
  socket.on('changeName', (name: string, callback: any) => {
    const user = methods.getUser(socket.id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }
    const oldName = user.name;
    changeUserName(socket.id, name);
    const users = methods.getUsersInRoom(user.room);
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
    const user = methods.getUser(socket.id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }
    console.log(character);
    const error = changeUserCharacter(socket.id, character);

    if (error) {
      console.log(error);
    }
    const users = methods.getUsersInRoom(user.room);
    console.log(users);

    socket.broadcast.to(user.room).emit('changeUsers', { users: users });
    callback();
  });

  socket.on('getUsers', (callback: any) => {
    const user = methods.getUser(socket.id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }
    const users = methods.getUsersInRoom(user.room);
    callback(users);
  });
};

module.exports = { userSocket };
