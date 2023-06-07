import { Server as SocketServer, Socket } from 'socket.io';
import GAME_EVENT from './eventType';
import { rooms, games } from '../../../stores';
import Board from '../../domain/board';
import Piece from '../../domain/piece';
import { clearTimer, setRoundTimer } from '../../services/game';

const gameHandler = (io: SocketServer, socket: Socket) => {
  let time = null;

  socket.on(GAME_EVENT.START, ({ roomCode }) => {
    const room = rooms[roomCode];
    const pieces = room.users.map((user) => new Piece(user));
    const board = new Board(room, 12, 8, pieces);
    games[roomCode] = board;

    const userId = board.getCurrentRotationUserId();
    setRoundTimer(board, 'timer', () => {
      io.to(roomCode).emit(GAME_EVENT.START_TURN, { userId }); // 이벤트를 받으면 주사위를 던진다.
    });
  });

  socket.on(GAME_EVENT.REQUEST_ACCEPT, ({ gameCode, position, count, diceNum }) => {
    const id = socket.id;
    const board = games[gameCode];
    const user = board.blocks.findEarnedUser(position);
    io.to(user.id).emit(GAME_EVENT.REQUEST_ACCEPT, { userId: id, count, diceNum });
    setRoundTimer(
      board,
      'requstTimer',
      () => {
        io.to(id).emit(GAME_EVENT.RESPONSE_ACCEPT, { status: true });
      },
      10000,
    );
  });

  socket.on(GAME_EVENT.RESPONSE_ACCEPT, ({ gameCode, status, userId }) => {
    const board = games[gameCode];
    clearTimer(board.requestTimer);
    io.to(userId).emit(GAME_EVENT.RESPONSE_ACCEPT, { status });
  });

  socket.on(GAME_EVENT.MOVE, ({ gameCode, position, diceNum, count }) => {
    let type = 'go';

    const id = socket.id;
    const board = games[gameCode];

    if (diceNum > 7) {
      type = 'init';
    } else {
      const moveCount = diceNum * count;
      board.move(position, moveCount);
    }

    io.to(gameCode).emit(GAME_EVENT.GAME_DATA, { board, type });
    board.history.add(id, count, diceNum);
  });

  socket.on(GAME_EVENT.START_TURN, ({ gameCode, callback }) => {
    time = setTimeout(() => {
      socket.emit(GAME_EVENT.TIME_OUT, { gameCode });
    }, 60000);

    callback();
  });

  socket.on(GAME_EVENT.END_TURN, ({ gameCode }) => {
    if (time) {
      clearTimeout(time);
      time = null;
    }

    const board = games[gameCode];
    board.next();
    io.to(gameCode).emit(GAME_EVENT.GAME_DATA, { board, type: 'next' });
  });

  socket.on(GAME_EVENT.TIME_OUT, ({ gameCode }) => {
    const id = socket.id;
    io.to(gameCode).emit(GAME_EVENT.TIME_OUT, { id });
    const time = setTimeout(() => {
      socket.emit(GAME_EVENT.END_TURN, { gameCode });
    }, 5000);
    clearTimeout(time);
  });

  socket.on(GAME_EVENT.GAME_END, () => {});
};

export default gameHandler;
