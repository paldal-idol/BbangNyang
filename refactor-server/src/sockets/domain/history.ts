type HistoryType = {
  id: string;
  count: number;
  diceNum: number;
};

class History {
  history: HistoryType[];
  constructor() {
    this.history = [];
  }

  add(id, count, diceNum) {
    this.history.push({ id, diceNum, count });
  }
}

export default History;
