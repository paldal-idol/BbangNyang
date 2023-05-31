export const reArrange = <T>(arr: T[]) => {
  const firstEl = arr[0];
  return [...arr.slice(1), firstEl];
};

const MAX_POINT = 6;
const MIN_POINT = 1;

export const generateRandomNumbers = (count) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * MAX_POINT) + MIN_POINT);
};
