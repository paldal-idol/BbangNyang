const users:any[] = [];

const checkNumberOfUsers = (room:string)=>{
  const userNumber = users.filter((user)=>user.room===room).length;
  if(userNumber<6) return true;
  else return false;
}

const addUser = ({ id, name, room }:any) => {
  const existingUser = users.find((user) => user.room === room && user.name === name);
  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room, ready: false };

  users.push(user);
  return { user };
};

const removeUser = (id:string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id:string) => users.find((user) => user.id === id);

const getUsersInRoom = (room:string) => users.filter((user) => user.room === room);

const changeUser = ({id,name}:any)=>{
  const user = users.find((user) => user.id === id);
  console.log(`Change user name of socket ${user.id}, ${user.name} of room ${user.room}`);
  console.log(`Change user name: ${user.name} to ${name}`);
  user.name = name;
  removeUser(id);
  addUser(user);
};

const checkRoom = (roomCode:string) => {
  const existingRoom = users.find((user) => user.room === roomCode);
  if (existingRoom) {
    return false;
  } else {
    return true;
  }
};
module.exports = { checkNumberOfUsers, addUser, removeUser, getUser, getUsersInRoom, changeUser };
