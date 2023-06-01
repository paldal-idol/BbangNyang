import Board from '../sockets/domain/board';
import Room from '../sockets/domain/room';

export type RoomsType = {
  [code: string]: Room;
};

export type GameType = {
  [code: string]: Board;
};

export let rooms: RoomsType = {};

export let games: GameType = {};
