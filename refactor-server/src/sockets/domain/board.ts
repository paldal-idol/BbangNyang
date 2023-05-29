import Block from './block';

class Board {
  maxBlock: number;
  blocks: Block[];

  constructor(pieces) {
    this.maxBlock = 21;
    this.blocks = Array.from({ length: this.maxBlock }).map((_, idx) => new Block(idx));
    this.blocks[0] = pieces;
  }

  changePiecePosition(prevPosition, nextPosition) {
    const blockLength = this.blocks[prevPosition].pieces.length;

    if (blockLength === 1) {
      this.replacePiece(prevPosition, nextPosition);
    } else if (blockLength > 1) {
      this.replacePieces(prevPosition, nextPosition);
    } else {
      throw new Error('빈 공간입니다.');
    }
  }

  replacePiece(prevPosition, nextPosition) {
    this.blocks[nextPosition].pushPiece(this.blocks[prevPosition].popPiece());
  }
  replacePieces(prevPosition, nextPosition) {
    this.blocks[nextPosition].pushPieces(this.blocks[prevPosition].popPieces());
  }

  compareCircuits(position) {
    return position > this.maxBlock;
  }

  calculatePosition(position) {
    return position % this.maxBlock;
  }

  move(prevPosition, nextPosition) {
    if (this.compareCircuits(nextPosition)) {
      this.blocks[prevPosition].pieces[0].user.score += 1;
    }
    const position = this.calculatePosition(nextPosition);
    this.changePiecePosition(prevPosition, position);
  }
}

export default Board;
