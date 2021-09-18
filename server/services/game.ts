import { methods } from '../store/users';

// const { methods } = require('../store/users');
const changeUserOrder = (id: string, order: number) => {
  const user = methods.getUser(id);

  if (user === undefined) {
    return { error: 'Is not Users' };
  }

  user.order = order;
};

module.exports = {
  changeUserOrder,
};
