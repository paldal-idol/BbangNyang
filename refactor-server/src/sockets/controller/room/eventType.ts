const ROOM_EVENT = {
  GAME_START: 'gameStart',
  JOIN: 'join',
  READY: 'ready',
  KICK_OUT: 'kickOut',
  CHECK_ROOM: 'checkRoom',
  CHECK_ROUND: 'checkRound',
  CHANGE_ROUND: 'changeRound',
  ROOM_DATA: 'roomData',
} as const;

export default ROOM_EVENT;
