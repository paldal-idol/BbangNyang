import type { User } from './User';

let roomCount: number = 0;

class GameRoom {
  private roomId: number;
  private roomCode: string; //방 입장 코드
  private roomState: boolean; //게임 시작 여부
  private userList: []; //참가 유저 목록
  private currentPlayer: User; //현재 턴 유저

  constructor(roomCode: string) {
    this.roomId = roomCount + 1;
    this.roomCode = roomCode;
    this.userList = [];
  }
  getRoomId() {
    return this.roomId;
  }

  getRoomCode() {
    return this.roomCode;
  }
}
export default GameRoom;
export type { GameRoom };
