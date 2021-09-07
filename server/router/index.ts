const express = require('express');
const router = express.Router();

const startRouter = require('../start/router');
const waitingRouter = require('../waiting/router');
const gameRouter = require('../game/router');

router.use('/waiting', waitingRouter);
router.use('/game', gameRouter);
router.use('/', startRouter);

export default router;
