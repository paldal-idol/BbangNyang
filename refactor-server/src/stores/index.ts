import Room from '../sockets/domain/room';

export type RoomsType = {
  [code: string]: Room;
};

export let rooms: RoomsType = {};
