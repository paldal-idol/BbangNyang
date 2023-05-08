import type User from './user';

class Room {
  room: string;
  round: number;
  users: User[];

  constructor(room, round) {
    this.room = room;
    this.round = round;
    this.users = [];
  }

  getRound() {
    return this.round;
  }
  setRound(round: number) {
    this.round = round;
  }

  addUser(user: User) {
    this.users.push(user);
  }
  removeUser(user: User) {
    const index = this.users.findIndex(({ id }) => id === user.id);
    this.users.splice(index, 1);
  }
  getUsers() {
    return this.users;
  }
  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  checkAllReady() {
    return this.users.filter((user) => user.isReady).length === this.users.length;
  }
}

export default Room;
