import { atom } from 'recoil';

const modalState = atom({
  key: 'modalState',
  default: 'SelectCharacterModal',
});

export default modalState;
