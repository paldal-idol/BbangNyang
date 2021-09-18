import users from '../store/users';

const isExistRoom = (room: string) => {
  const existingRoom = users.find((user) => user.room === room);
  if (existingRoom) {
    return true;
  }
  return false;
};

const isValidNumberOfUsers = (room: string) => {
  const userNumber = users.filter((user) => user.room === room).length;
  if (userNumber < 6) {
    return true;
  }
  return false;
};

module.exports = {
  isValidNumberOfUsers,
  isExistRoom,
};
