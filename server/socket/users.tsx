const users = [];

const addUser = ({ id, name, room }) => {
  const existingUser = users.find((user) => user.room === room && user.name === name);
  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const changeUser = ({id,name})=>{
  const user = users.find((user) => user.id === id);;
  console.log(`Change user name of socket ${user.id}, ${user.name} of room ${user.room}`)
  console.log(`Change user name: ${user.name} to ${name}`);
  user.name = name;
  removeUser(id);
  addUser(user);
};
const checkRoom = (roomCode) => {
  const existingRoom = users.find((user) => user.room === roomCode);
  if (existingRoom) {
    return false;
  } else {
    return true;
  }
};
module.exports = { addUser, removeUser, getUser, getUsersInRoom, changeUser };
