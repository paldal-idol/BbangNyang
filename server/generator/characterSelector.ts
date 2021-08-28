const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomCharacter = (users: any[]) => {
  if (users === undefined || users.length === 0) {
    return getRandomInt(0, 10);
  }
  while (true) {
    const selected = getRandomInt(0, 10);
    if (users.find((user) => user.character === selected) === undefined) {
      return selected;
    }
  }
};
