
const http = require('http');

import socketIO  from './sockets/index';
import createApplication from './app';





const app = createApplication();

const server = http.createServer(app);

const corsOptions = {
    cors: true,
    origins: [process.env.CLIENT || 'http://localhost:3000'],
  };
  
socketIO.attach(server, corsOptions);


const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
