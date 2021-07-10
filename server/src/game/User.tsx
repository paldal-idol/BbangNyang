import express from 'express';
import type { GameRoom } from './GameRoom';

let userNum;

class User {
  private userId;
  private userName;
  private socket;
  private gameRoom;

  constructor(socket) {
    this.socket = socket;
  }

  enterRoom = (room: GameRoom) => {
    this.gameRoom = room;
  };
}
export default User;
export type { User };
