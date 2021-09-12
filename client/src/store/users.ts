import { atom } from 'recoil';

const miniUsersState = atom({
  key: 'miniUsersState',
  default: [],
});

export default miniUsersState;
