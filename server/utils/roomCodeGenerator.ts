const { RoomList } = require('../store/users');
const generateCode = () => {
  const randomString = Math.random().toString(36).toUpperCase(); //범위 : 숫자 0~9, 알바펫 A~Z
  return randomString.slice(2, 8);
};

export const getNewRoomCode = (roomList: String[] = []) => {
  console.log('start generate code');

  while (true) {
    const code = generateCode();
    if (!roomList.includes(code)) {
      RoomList.push({ room: code, round: 6 });
      return code;
    }
  }
};
