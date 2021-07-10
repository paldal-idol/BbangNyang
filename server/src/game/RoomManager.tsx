import express from 'express';
import GameRoom from './GameRoom';
import User from './User';

class RoomManager {
  roomList: GameRoom[];
  constructor() {
    this.roomList = [];
  }
  makeRoom = (roomCode) => {
    let room = new GameRoom(roomCode);
    this.roomList.push(room);
  };

  deleteRoom = (roomId) => {
    const findRoom = this.roomList.find((room) => {
      return room.roomId === roomId;
    });
    if (findRoom === null) {
      console.log('오류');
    } else {
      let roomIdx = this.roomList.indexOf(findRoom);
      if (this.roomList[roomIdx].users.length === 0) {
        this.roomList.splice(roomIdx, 1);
      }
    }
  };

  enterRoom = (roomId, roomCode, userId) => {
    const findRoom = this.roomList.find((room) => {
      return room.roomId === roomId;
    });

    if (findRoom === null) {
      console.log('방이 없습니다.');
    } else {
      let roomIdx = this.roomList.indexOf(findRoom);
      this.roomList[roomIdx].users.push(userId);
    }
  };
  leaveRoom = (roomId, userId) => {
    const findRoom = this.roomList.find((room) => {
      return room.roomId === roomId;
    });
    if (findRoom === null) {
      console.log('오류');
    } else {
      let roomIdx = this.roomList.indexOf(findRoom);
      let userIdx = this.roomList[roomIdx].users.indexOf(userId);
      this.roomList[roomIdx].users.splice(userIdx, 1);
    }
  };

  showRoom = () => {
    return this.roomList;
  };
}
export default RoomManager;
