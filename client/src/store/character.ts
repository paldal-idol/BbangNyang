import { atom } from 'recoil';

const userCharacter = atom({
  key: 'userCharacter',
  default: 0,
});

export default userCharacter;
