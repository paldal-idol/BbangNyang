import Block from './block';
import { MAX_BLOCK, ZERO } from '../../constants';

class Blocks {
  blocks: Block[];

  constructor(pieces) {
    this.blocks = this.setBlocks(MAX_BLOCK);
    this.blocks[ZERO].setPieces(pieces);
  }

  setBlocks(maxBlock) {
    return Array.from({ length: maxBlock }).map((_, idx) => new Block(idx));
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
    const piece = this.blocks[prevPosition].popPiece();
    this.blocks[nextPosition].pushPiece(piece);
  }

  replacePieces(prevPosition, nextPosition) {
    const pieces = this.blocks[prevPosition].popPieces();
    this.blocks[nextPosition].pushPieces(pieces);
  }

  compareCircuits(position) {
    return position > MAX_BLOCK;
  }

  calculatePosition(position) {
    return position % MAX_BLOCK;
  }

  findEarnedUser(position) {
    const pieces = this.blocks[position].pieces;
    const lastIdx = pieces.length - 1;
    return pieces[lastIdx].user;
  }

  repositionPieces(prevPosition, nextPosition) {
    const position = this.calculatePosition(nextPosition);
    this.changePiecePosition(prevPosition, position);
  }
}

export default Blocks;
