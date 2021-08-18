import { atom } from 'recoil';

const diceState = atom({
  key: 'diceState',
  default: 0,
});

export default diceState;
