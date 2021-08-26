import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    id: '',
    userId: '',
    name: '',
    isReady: false,
    character: 0,
  },
});

export default userState;
