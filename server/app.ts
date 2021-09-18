// import { resolveSoa } from 'dns/promises';

import cors from 'cors'
const express = require('express');

//require('dotenv').config();

import indexRouter from './routes/index';


const createApplication = () => {
  const app = express();
  app.use(cors());
  app.use('/', indexRouter);
  return app;
};

export default createApplication;

