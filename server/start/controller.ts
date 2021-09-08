const { getNewRoomCode } = require('../utils/roomCodeGenerator');
const { getNewName } = require('../utils/nameGenerator');

const start = {
  makeRoom: (req: any, res: any) => {
    res.send({ code: getNewRoomCode(), name: getNewName() });
  },
  getName: (req: any, res: any) => {
    res.send({ name: getNewName() });
  },
};

module.exports = start;
