// import { io } from '../app';
// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// io.on('connect', (socket: any) => {
//   socket.on('join', ({ name, room }: any, callback: any) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if (error) return callback(error);

//     socket.join(user.room);

//     socket.emit('message', {
//       user: 'admin',
//       text: `${user.name}, welcome to room ${user.room}.`,
//     });
//     socket.broadcast
//       .to(user.room)
//       .emit('message', { user: 'admin', text: `${user.name} has joined!` });

//     io.to(user.room).emit('roomData', {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });

//     callback();
//   });

//   socket.on('sendMessage', (message: any, callback: any) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if (user) {
//       io.to(user.room).emit('message', {
//         user: 'Admin',
//         text: `${user.name} has left.`,
//       });
//       io.to(user.room).emit('roomData', {
//         room: user.room,
//         users: getUsersInRoom(user.room),
//       });
//     }
//   });
// });

// module.exports = io;
