/*
(c) by Thomas Konings
Random Name Generator for Javascript
*/
import { firstName, lastName } from './nameList';

const { users } = require('../socket/users');

const checkDuplicate = (name: string) => {
  if (!users) return true;
  const names = users.map((user: any) => user.name);
  if (names.find((existName: string) => existName === name) === -1) return true;
  else return false;
};

const capFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateName = () => {
  return (
    capFirst(firstName[getRandomInt(0, firstName.length + 1)]) +
    ' ' +
    capFirst(lastName[getRandomInt(0, lastName.length + 1)])
  );
};

export const getNewName = () => {
  while (true) {
    const name = generateName();
    if (checkDuplicate(name)) return name;
  }
};
