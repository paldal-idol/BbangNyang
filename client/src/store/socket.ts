import io from 'socket.io-client';
import React from 'react';

const ENDPOINT = 'localhost:8000';
class Socket {
  socket;

  init = () => {
    this.socket = io(ENDPOINT, { reconnection: true });
  };
}

const socketIO = new Socket();
export default socketIO;
