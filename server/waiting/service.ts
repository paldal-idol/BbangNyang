import users from '../store/users';

const { isValidName, isValidCharacter } = require('../store/users.ts');

const addUser = ({ id, name, room, character }: any) => {
  if (!name || !room) {
    return { error: 'Username and room are required.' };
  }

  if (!isValidName(name, room)) {
    return { error: 'Username is taken.' };
  }

  const user = { id, name, room, isReady: false, character: character };

  users.add(user);

  return { user };
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.remove(index);
  }
};

const changeUserReady = (id: string, readyState: boolean) => {
  const user = users.getUser(id);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  console.log(`Change user ready state: ${readyState}`);

  user.isReady = readyState;
};

const changeUserName = (id: string, name: string) => {
  const user = users.getUser(id);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  console.log(`Change user name of socket ${user.id}, ${user.name} of room ${user.room}`);

  if (!isValidName(name, user.room)) {
    return { error: 'Username is taken.' };
  }

  console.log(`Change user name: ${user.name} to ${name}`);
  user.name = name;
};

const changeUserCharacter = (id: string, character: number) => {
  const user = users.getUser(id);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  if (!isValidCharacter(character, user.room)) {
    return { error: 'Selected character is taken.' };
  }

  user.character = character;
};

//401 : notEnoughReady 402 : notEnoughUsers
const isAllReady = () => {
  const userList = users.getUserList();

  return userList.reduce((result, element, index) => {
    result += element.isReady === true ? 1 : index === 0 ? 1 : 0;
    return result;
  }, 0) === userList.length && userList.length >= 3
    ? 200
    : userList.length >= 3
    ? 401
    : 402;
};

module.exports = {
  addUser,
  removeUser,
  changeUserName,
  changeUserReady,
  changeUserCharacter,
  isAllReady,
};
