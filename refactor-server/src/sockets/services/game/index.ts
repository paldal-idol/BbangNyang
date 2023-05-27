export const reArrange = <T>(arr: T[]) => {
  const firstEl = arr[0];
  return [...arr.slice(1), firstEl];
};
