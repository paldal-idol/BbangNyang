const router = require('express').Router();

const { getNewRoomCode } = require('./utils/roomCodeGenerator');
const { getNewName } = require('./utils/nameGenerator');

router.get('/makeRoom', (req: any, res: any) => {
  res.send({ code: getNewRoomCode(), name: getNewName() });
});

router.get('/getName', (req: any, res: any) => {
  res.send({ name: getNewName() });
});

export default router;
