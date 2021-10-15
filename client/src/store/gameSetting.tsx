import { atom } from 'recoil';

const GameSettingState = atom({
  key: 'gameSettingState',
  default: { round: 4 },
});

export default GameSettingState;
