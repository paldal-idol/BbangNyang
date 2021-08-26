export {};
const { users } = require('../socket/users');

const checkDuplicate = (id: string) => {
  if (!users) return true;
  const ids = users.map((user: any) => user.id);
  if (ids.find((existId: string) => existId === id) === -1) return true;
  else return false;
};

const generateId = () => {
  return Math.random().toString(36).toUpperCase(); //범위 : 숫자 0~9, 알바펫 A~Z
};

export const getNewId = () => {
  while (true) {
    const Id = generateId();
    if (checkDuplicate(Id)) return Id;
  }
};
