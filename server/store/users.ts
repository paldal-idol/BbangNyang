type User = {
  id: string;
  name: string;
  room: string;
  isReady: boolean;
  character: number;
};

class Users {
  private data: User[];

  constructor() {
    this.data = [];
  }

  add = (user: User) => this.data.push(user);

  remove = (index: number) => this.data.splice(index, 1)[0];

  getUserList = () => this.data;

  getUser = (id: string) => this.data.find((user) => user.id === id);

  getUsersInRoom = (room: string) => this.data.filter((user) => user.room === room);

  isValidCharacter = (character: number, room: string) =>
    this.data.find((user) => user.room === room && user.character === character) === undefined;

  isValidName = (name: string, room: string) =>
    this.data.find((user) => user.room === room && user.name === name) === undefined;

  // override
  findIndex = (
    predicate: (value: User, index: number, obj: User[]) => unknown,
    thisArg?: any,
  ): number => this.data.findIndex(predicate, thisArg);

  find = (
    predicate: (value: User, index: number, obj: User[]) => unknown,
    thisArg?: any,
  ): User | undefined => this.data.find(predicate, thisArg);

  filter = (
    predicate: (value: User, index: number, array: User[]) => unknown,
    thisArg?: any,
  ): User[] => this.data.filter(predicate, thisArg);
}

const users = new Users();

const getUser = (id: string) => {
  return users.getUser(id);
};

const getUsersInRoom = (id: string) => {
  return users.getUsersInRoom(id);
};

module.exports = { getUser, getUsersInRoom };

export default users;
