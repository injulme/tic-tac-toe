import { useState } from "react";
import "./App.scss";

function Board({ squares, onClick }) {
  return (
    <div className="grid">
      {squares.map((square, index) => {
        return (
          <button
            className="grid-item"
            onClick={() => onClick(index)}
            key={index}
          >
            {square}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState([...initialSquares]);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (winner || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const onReset = () => {
    setSquares(initialSquares);
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        <button className="game-reset__button" onClick={onReset}>
          다시하기
        </button>
        <div className="game-winner__title">{status}</div>
        <Board squares={squares} onClick={handleClick} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
