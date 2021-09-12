import { atom } from 'recoil';

const usersState = atom({
  key: 'usersState',
  default: [],
});

export default usersState;
