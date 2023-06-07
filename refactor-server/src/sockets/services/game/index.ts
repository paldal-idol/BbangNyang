import Board from '../../domain/board';

export const reArrange = <T>(arr: T[]) => {
  const firstEl = arr[0];
  return [...arr.slice(1), firstEl];
};

const MAX_POINT = 6;
const MIN_POINT = 1;

export const generateRandomNumbers = (count) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * MAX_POINT) + MIN_POINT);
};

export const setRoundTimer = (board: Board, key, callback, time = 60000) => {
  clearTimer(board[key]);

  board[key] = setTimeout(() => {
    if (!board) return;

    callback();
  }, time);
};

export const clearTimer = (timer: NodeJS.Timeout | null) => {
  if (!timer) return;
  clearTimeout(timer);
};
