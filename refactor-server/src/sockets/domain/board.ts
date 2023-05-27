import Block from './block';

class Board {
  maxBlock: number;
  blockList;

  constructor(pieceList) {
    this.maxBlock = 21;
    this.blockList = Array.from({ length: this.maxBlock }).map((_, idx) => new Block(idx));
    this.blockList[0] = pieceList;
  }

  changePiecePosition(prevPosition, nextPosition) {}
}

export default Board;
