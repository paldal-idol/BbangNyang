import { reArrange } from '../services/game';
import Room from './room';
import type User from './user';

type HistoryType = {
  id: string;
  count: number;
};

class Game extends Room {
  turn;
  rotationList: string[];
  history: HistoryType[];

  constructor(room, round, users: User[]) {
    super(room, round);
    this.turn = 0;
    this.users = users;
    this.rotationList = users.map((user) => user.id);
    this.history = [];
  }

  nextRound() {
    this.round += 1;
  }
  nextTurn() {
    this.rotationList = reArrange(this.rotationList);
  }
}

const game = new Game({}, 0, []);

game.getRound();

export default Game;
