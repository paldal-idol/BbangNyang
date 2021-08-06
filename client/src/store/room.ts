import { atom } from 'recoil';

const roomState = atom({
  key: 'roomState',
  default: '',
});

export default roomState;
