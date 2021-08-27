export {};
const users: any[] = [];

const isValidName = (name: string, room: string) => {
  if (!name) {
    return false;
  }
  return users.find((user) => user.room === room && user.name === name) === undefined;
};

const isValidCharacter = (character: number, room: string) => {
  if (!character) {
    return false;
  }
  return users.find((user) => user.room === room && user.character === character) === undefined;
};

const addUser = ({ id, userId, name, room, isReady, character }: any) => {
  if (!name || !room) return { error: 'Username and room are required.' };

  if (!isValidName(name, room)) return { error: 'Username is taken.' };

  const user = { id, userId, name, room, isReady, character };

  users.push(user);
  return { user };
};

const removeUser = (userId: string) => {
  const index = users.findIndex((user) => user.userId === userId);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (userId: string) => users.find((user) => user.userId === userId);

const getUserId = (socketId: string) => users.find((user) => user.id === socketId).userId;

const getUsersInRoom = (room: string) => users.filter((user) => user.room === room);

const changeUserReady = (userId: string, readyState: boolean) => {
  const user = getUser(userId);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  console.log(`Change user ready state: ${readyState}`);

  user.isReady = readyState;
};

const changeUserName = (userId: string, name: string) => {
  const user = getUser(userId);

  console.log(`Change user name of socket ${user.id}, ${user.name} of room ${user.room}`);

  if (!isValidName(name, user.room)) return { error: 'Username is taken.' };

  console.log(`Change user name: ${user.name} to ${name}`);
  user.name = name;
};

const changeUserCharacter = (userId: string, character: number) => {
  const user = getUser(userId);

  if (!isValidCharacter(character, user.room)) return { error: 'Selected character is taken.' };

  user.character = character;
};

const isExistRoom = (roomCode: string) => {
  const existingRoom = users.find((user) => user.room === roomCode);
  if (existingRoom) {
    return true;
  } else {
    return false;
  }
};

const isValidNumberOfUsers = (room: string) => {
  const userNumber = users.filter((user) => user.room === room).length;
  if (userNumber < 6) return true;
  else return false;
};

//401 : notEnoughReady 402 : notEnoughUsers
const isAllReady = () => {
  return users.reduce((result, element, index) => {
    result += element.isReady === true ? 1 : index === 0 ? 1 : 0;
    return result;
  }, 0) === users.length && users.length >= 3
    ? 200
    : users.length >= 3
    ? 401
    : 402;
};
module.exports = {
  isValidNumberOfUsers,
  isExistRoom,
  addUser,
  removeUser,
  getUser,
  getUserId,
  getUsersInRoom,
  changeUserName,
  changeUserReady,
  changeUserCharacter,
  isAllReady,
};
