import { atom } from 'recoil';

const selectedCharacter = atom({
  key: 'selectedCharacter',
  default: [],
});

export default selectedCharacter;
