class User {
  id: string;
  name: string;
  roomCode: string;
  isReady: boolean;
  character: number;
  score: number;

  constructor({ id, name, roomCode, character }) {
    this.id = id;
    this.name = name;
    this.roomCode = roomCode;
    this.character = character;
    this.isReady = false;
    this.score;
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

  initScore() {
    this.score = 0;
  }
  addScore(score) {
    this.score += score;
  }
}

export default User;
