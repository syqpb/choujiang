import React, { useEffect, useState } from "react";
import "./App.css";

import { Lottery, NormalPerson } from "./module";

const totalPerson = [
  { id: 1, name: "xiaoming" },
  { id: 2, name: "小 ming" },
  { id: 3, name: "jack" },
];
const topTenPerson = [{ id: 2, name: "smal" }];

function App() {
  const [winner, setWinner] = useState<NormalPerson|null>(null);
  const [error, setError] = useState<string>("");

  const [lottery, setLottery] = useState<Lottery | null>(null);

  const pick = () => {
    try {
      const winner = lottery?.pick();
      winner && setWinner(winner);
    } catch (error: any) {
      setError(error.message);
      setWinner(null);
    }
  };
  useEffect(() => {
    const lottery = new Lottery(totalPerson, topTenPerson);
    setLottery(lottery);
  }, []);
  return (
    <div className="App">
      <h1>抽奖系统</h1>
      <div>
        <label>
          {winner && <div>{winner.name}</div>}
          <button type="button" onClick={pick}>
            点击抽奖
          </button>
        </label>
      </div>
      <div>{error}</div>
    </div>
  );
}

export default App;
