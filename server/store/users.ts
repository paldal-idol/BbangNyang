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

const getUser = (id: string) => users.find((user) => user.id === id);

const getUsersInRoom = (room: string) => users.filter((user) => user.room === room);

module.exports = {
  isValidCharacter,
  isValidName,
  getUser,
  getUsersInRoom,
};

export default users;
