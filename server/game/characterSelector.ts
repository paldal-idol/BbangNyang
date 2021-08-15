function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCharacter() {
  const selected = getRandomInt(0, 10);
  return selected;
}

module.exports = { getRandomCharacter };
