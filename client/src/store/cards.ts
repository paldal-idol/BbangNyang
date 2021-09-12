import { atom } from 'recoil';

const cardsState = atom({
  key: 'cardsState',
  default: [],
});

export default cardsState;
