/*
(c) by Thomas Konings
Random Name Generator for Javascript
*/
import { firstName, lastName } from './nameList';

function capFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateName() {
  let name: string =
    capFirst(firstName[getRandomInt(0, firstName.length + 1)]) +
    ' ' +
    capFirst(lastName[getRandomInt(0, lastName.length + 1)]);
  return name;
}
