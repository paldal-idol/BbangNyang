import cors from 'cors';
const express = require('express');
const app = express();

const indexRouter = require('./router/index');

app.use(cors());
app.use('/', indexRouter);

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
