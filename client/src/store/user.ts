import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    id: '',
    name: '',
    isReady: false,
    character: 0,
    order: '',
    isGame: false,
    clearTime: 0,
  },
});

export default userState;
