type HistoryType = {
  id: string;
  count: number;
};

class History {
  history: HistoryType[];
  constructor() {
    this.history = [];
  }
}

export default History;
