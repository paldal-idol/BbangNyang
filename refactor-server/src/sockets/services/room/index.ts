import Room from '../../domain/room';

const generateCode = () => {
  const randomString = Math.random().toString(36).toUpperCase();
  return randomString.slice(2, 8);
};

export const createRoomCode = (roomList: Room[] = []) => {
  while (true) {
    const code = generateCode();
    if (!checkExistRoomCode(code, roomList)) {
      return code;
    }
  }
};

export const checkExistRoomCode = (code: string, roomList: Room[]) => {
  const roomCodes = roomList.map((room) => room.room);
  if (roomCodes.includes(code)) {
    return true;
  } else {
    return false;
  }
};
