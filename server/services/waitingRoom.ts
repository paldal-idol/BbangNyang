import { User } from '../store/users';
const { methods } = require('../store/users');
const addUser = ({ id, name, room, character }: any) => {
  if (!name || !room) {
    return { error: 'Username and room are required.' };
  }

  if (!isValidName(name, room)) {
    return { error: 'Username is taken.' };
  }

  const user: User = {
    id,
    name,
    room,
    isReady: false,
    character: character,
    order: -1,
    isGame: false,
    clearTime: 0,
  };

  methods.add(user);

  return { user };
};

const removeUser = (id: string) => {
  const index = methods.findIndex((user: User) => user.id === id);

  if (index !== -1) {
    return methods.remove(index);
  }
};

const changeUserReady = (id: string, readyState: boolean) => {
  const user = methods.getUser(id);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  console.log(`Change user ready state: ${readyState}`);

  // todo: 정보가 바뀌는지 확인 필요
  user.isReady = readyState;
};

const changeUserName = (id: string, name: string) => {
  const user = methods.getUser(id);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  console.log(`Change user name of socket ${user.id}, ${user.name} of room ${user.room}`);

  if (!isValidName(name, user.room)) {
    return { error: 'Username is taken.' };
  }

  console.log(`Change user name: ${user.name} to ${name}`);
  // todo: 정보가 바뀌는지 확인 필요
  user.name = name;
};

const changeUserCharacter = (id: string, character: number) => {
  const user = methods.getUser(id);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  if (!isValidCharacter(character, user.room)) {
    return { error: 'Selected character is taken.' };
  }

  // todo: 정보가 바뀌는지 확인 필요
  user.character = character;
};

//401 : notEnoughReady 402 : notEnoughUsers
const isAllReady = () => {
  const userList = methods.getUserList();

  return userList.reduce((result: number, element: any, index: number) => {
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

const isValidCharacter = (character: number, room: string) => {
  if (!character) {
    return false;
  }
  return methods.isValidCharacter(character, room);
};

const isValidName = (name: string, room: string) => {
  if (!name) {
    return false;
  }
  return methods.isValidName(name, room);
};
