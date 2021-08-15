function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCharacter(users: any[]) {
  while (1) {
    const selected = getRandomInt(0, 10);
    if (users.find((user) => user.character === selected) === undefined) {
      return selected;
    }
  }
}

module.exports = { getRandomCharacter };
