class User {
  id: string;
  name: string;
  roomCode: string;
  isReady: boolean;
  character: number;
  order: number;
  isGame: boolean;
  clearTime: number;

  constructor({ id, name, roomCode, character }) {
    this.id = id;
    this.name = name;
    this.roomCode = roomCode;
    this.character = character;
    this.isReady = false;
    this.order = -1;
    this.isGame = false;
    this.clearTime = 0;
  }

  changeReadyStatus(readyState: boolean) {
    this.isReady = readyState;
  }

  changeName(name: string) {
    this.name = name;
  }
  changeCharacter(character: number) {
    this.character = character;
  }
}

export default User;
