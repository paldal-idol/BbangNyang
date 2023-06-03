import { RoomsType } from '../../../stores';

const generateCode = () => {
  const randomString = Math.random().toString(36).toUpperCase();
  return randomString.slice(2, 8);
};

export const createRoomCode = (roomList: RoomsType = {}) => {
  while (true) {
    const code = generateCode();
    if (!checkExistRoomCode(code, roomList)) {
      return code;
    }
  }
};

export const checkExistRoomCode = (code: string, roomList: RoomsType) => {
  const roomCodes = Object.keys(roomList);
  if (roomCodes.includes(code)) {
    return true;
  } else {
    return false;
  }
};
