import Piece from './piece';

class Block {
  pieces: Piece[];
  idx: number;
  constructor(idx) {
    this.pieces = [];
    this.idx = idx;
  }
  popPiece() {
    return this.pieces.pop();
  }
  popPieces() {
    const pieces = this.pieces;
    this.pieces = [];
    return pieces;
  }
  pushPiece(piece) {
    this.pieces.push(piece);
  }
  pushPieces(pieces) {
    this.pieces.concat(pieces);
  }
}

export default Block;
