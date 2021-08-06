import io from 'socket.io-client'
import React from 'react';

const ENDPOINT = 'localhost:8000';
export default io(ENDPOINT);


