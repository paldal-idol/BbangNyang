import users from '../store/users';

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

module.exports = {
  isValidNumberOfUsers,
  isExistRoom,
};
