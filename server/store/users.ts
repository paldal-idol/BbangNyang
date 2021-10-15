export type User = {
  id: string;
  name: string;
  room: string;
  isReady: boolean;
  character: number;
  order: number;
  isGame: boolean;
  clearTime: 0;
};
export type Room = {
  room: string;
  round: number;
};
const data: User[] = [];
export const RoomList: Room[] = [];
export const methods = {
  addNewUser: (id: string, name: string, room: string, character: number) => {
    const newUser: User = {
      id,
      name,
      room,
      isReady: false,
      character: character,
      order: -1,
      isGame: false,
      clearTime: 0,
    };
    methods.add(newUser);
  },

  add: (user: User) => data.push(user),

  remove: (index: number) => data.splice(index, 1)[0],

  getUserList: () => data,

  getUser: (id: string) => data.find((user) => user.id === id),

  getUsersInRoom: (room: string) => data.filter((user) => user.room === room),

  isValidCharacter: (character: number, room: string) =>
    data.find((user) => user.room === room && user.character === character) === undefined,

  // isValidName = (name: string, room: string) =>
  //   data.find((user) => user.room === room && user.name === name) === undefined;

  isValidName: (name: string, room: string) => {
    return data.find((user: User) => user.room === room && user.name === name) === undefined;
  },
  // override
  findIndex: (
    predicate: (value: User, index: number, obj: User[]) => unknown,
    thisArg?: any,
  ): number => data.findIndex(predicate, thisArg),

  find: (
    predicate: (value: User, index: number, obj: User[]) => unknown,
    thisArg?: any,
  ): User | undefined => data.find(predicate, thisArg),

  filter: (
    predicate: (value: User, index: number, array: User[]) => unknown,
    thisArg?: any,
  ): User[] => data.filter(predicate, thisArg),
};

//const users = new Users();

// const getUser = (id: string) => {
//   return methods.getUser(id);
// };

// const getUsersInRoom = (id: string) => {
//   return methods.getUsersInRoom(id);
// };

//module.exports = { getUser, getUsersInRoom };

export default data;
