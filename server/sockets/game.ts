import { methods } from '../store/users';

const { getRandomOrderArray } = require('../utils/randomOrderGenerator');
const { changeUserOrder } = require('../services/game');

const gameSocket = (socketIO: any, socket: any) => {
  socket.on('getRandomOrder', (user: any) => {
    console.log(user.room);
    const users = methods.getUsersInRoom(user.room);
    console.log(`users : ${users}`);
    const randomOrder = getRandomOrderArray(users);
    console.log(randomOrder);
    socketIO.to(user.room).emit('randomOrderArray', randomOrder);
  });
  socket.on('setOrder', ({ clicked, clickedIndex, order }: any, callback: any) => {
    const user = methods.getUser(socket.id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }
    clicked[clickedIndex] = true;
    changeUserOrder(socket.id, order);
    console.log(user.name, order);
    callback(clicked);

    socket.emit('setClicked', clicked);
    socketIO.to(user.room).emit('setClicked', clicked);
  });
};
module.exports = { gameSocket };
