import express from 'express';
import cors from 'cors';
let router = express.Router();

const start = require('../start/controller');
// const waiting = require('../waiting/controller');
// const game = require('../game/controller');

router.use(cors());

// start page
router.get('/makeRoom', start.makeRoom);
router.get('/getName', start.getName);

// waiting page

// game page

export default router;
