import { atom } from 'recoil';

const diceState = atom({
  key: 'diceState',
  default: { total: 0, score: 0, count: 0 },
});

export default diceState;
