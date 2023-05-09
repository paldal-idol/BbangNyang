import express from 'express';
import cors from 'cors';
import http from 'http';

import router from './routes';
import socket from './sockets';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use('/', router);

const server = http.createServer(app);
socket(server, {
  cors: { origin: '*', credentials: true },
});

server.listen(port, () => {
  return console.log(`http://localhost:${port}`);
});
