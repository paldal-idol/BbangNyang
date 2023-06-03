import express from 'express';
import { rooms } from '../stores';
import { createRoomCode, checkExistRoomCode } from '../sockets/services/room';
import Room from '../sockets/domain/room';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello');
});

router.get('/room', (req, res) => {
  const code = req.query.code as string;
  if (code === undefined) res.send({ status: false });

  const status = checkExistRoomCode(code, rooms);

  res.send({ status });
});

router.post('/room', (req, res) => {
  const code = createRoomCode(rooms);
  const room = new Room(code, 6);

  rooms[code] = room;

  res.send({ code });
});

export default router;
