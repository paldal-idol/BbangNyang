export const getRandomOrderArray = (users: any[]) => {
  let randomOrderArray: number[] = [];
  console.log(users);
  users.map((user: any, idx: number) => {
    while (1) {
      const randomOrder = Math.floor(Math.random() * users.length + 1);

      if (!randomOrderArray.includes(randomOrder)) {
        randomOrderArray.push(randomOrder);
        console.log(randomOrderArray);
        break;
      }
    }
  });
  return randomOrderArray;
};
