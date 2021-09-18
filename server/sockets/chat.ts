import { methods } from '../store/users';

// const { methods } = require('../store/users.ts');
const chatSocket = (socketIO: any, socket: any) => {
  socket.on('sendMessage', (message: any, callback: any) => {
    const user = methods.getUser(socket.id);
    if (user === undefined) {
      return { error: 'Is not Users' };
    }

    //모든 사용자에게 메시지 전달
    socketIO.to(user.room).emit('message', { user: user, text: message });
    callback();
  });
};

module.exports = { chatSocket };
