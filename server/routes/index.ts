import express from 'express';
import cors from 'cors';
let router = express.Router();

const start = require('../start/controller');

router.use(cors());

// start page
router.get('/makeRoom', start.makeRoom);
router.get('/getName', start.getName);

// waiting page

// game page

export default router;
