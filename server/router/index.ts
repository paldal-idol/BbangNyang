import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  //res.send('Hello,World');
  res.send([
    {
      roomId: 1,
      roomCode: 1234,
      roomState: '게임중',
    },
    {
      roomId: 2,
      roomCode: 2345,
      roomState: '대기중',
    },
    {
      roomId: 3,
      roomCode: 3456,
      roomState: '대기중',
    },
  ]);
});

router.get('/waiting', (req: express.Request, res: express.Response) => {
  res.send([
    { name: '은승균', id: 1 },
    { name: '차재명', id: 2 },
  ]);
});

router.get('/rooms', (req: express.Request, res: express.Response) => {
  res.send([
    {
      roomId: 1,
      roomCode: 1234,
      roomState: '게임중',
    },
    {
      roomId: 2,
      roomCode: 2345,
      roomState: '대기중',
    },
    {
      roomId: 3,
      roomCode: 3456,
      roomState: '대기중',
    },
  ]);
});
module.exports = router;
// import express from 'express';

// let router = express.Router();

// module.exports = router;
