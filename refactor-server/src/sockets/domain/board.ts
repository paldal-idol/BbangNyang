import { shuffle } from 'lodash-es';
import { generateRandomNumbers, reArrange } from '../services/game';
import Blocks from './blocks';
import Room from './room';
import History from './history';
import { ZERO, ONE } from '../../constants';

class Board extends Room {
  turn: number;
  curRound: number;
  pointCards: number[];
  rotationList: string[];
  history: History;
  blocks: Blocks;
  timer: NodeJS.Timer | null;
  requestTimer: NodeJS.Timer | null;

  constructor(room, round, pointCount, pieces) {
    super(room, round);
    this.curRound = ZERO;
    this.timer = null;
    this.requestTimer = null;
    this.history = new History();
    this.blocks = new Blocks(pieces);
    this.rotationList = shuffle(this.getIdsByPieces(pieces));
    this.pointCards = this.generatePointList(pointCount);
  }

  getIdsByPieces(pieces) {
    return pieces.map((user) => user.id);
  }

  generatePointList(round) {
    return generateRandomNumbers(round);
  }

  popPoint() {
    return this.pointCards.shift();
  }

  move(prevPosition, nextPosition) {
    if (this.blocks.compareCircuits(nextPosition)) {
      this.plusScoreAndRemovePieces(prevPosition);
    } else {
      this.blocks.repositionPieces(prevPosition, nextPosition);
    }
  }

  plusScoreAndRemovePieces(position) {
    const user = this.blocks.findEarnedUser(position);
    const point = this.popPoint();
    user.addScore(point);
    this.blocks[point].clear();
  }

  next() {
    if (this.round > this.curRound) {
      this.nextTurn();
      this.nextRotation();
      if (this.isNextRound()) {
        this.nextRound();
      }
    } else {
      this.endGame();
    }
  }

  isNextRound() {
    return this.turn % this.rotationList.length === ZERO;
  }

  nextTurn() {
    this.turn += ONE;
  }

  nextRound() {
    this.curRound += ONE;
  }

  getCurrentRotationUserId() {
    return this.rotationList[0];
  }

  nextRotation() {
    this.rotationList = reArrange(this.rotationList);
  }

  endGame() {}
}

export default Board;
