import { useState, useRef } from "react";
import Cell from "./Cell";
import useInterval from "../hooks/useInterval";
import useTrait from "../hooks/useTrait";

const Game = ({ height, width, cellSize = 20, palette = "vapor" }) => {
  const rows = parseInt(height / cellSize);
  const cols = parseInt(width / cellSize);
  // we need this to be called for the initial state of our first board on load
  // so it gets declared up here
  const createEmptyBoard = () => {
    const board = [];
    for (let y = 0; y < rows; y++) {
      board[y] = [];
      for (let x = 0; x < cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  };
  const boardRef = useRef();
  const board = useTrait(createEmptyBoard());
  const [cells, setCells] = useState([]);
  const [delay, setDelay] = useState(500);
  const [isRunning, setIsRunning] = useState(false);

  const createCells = () => {
    const cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (board.get()[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  };

  const calculateNeighbors = (board, x, y) => {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const y1 = y + dir[0];
      const x1 = x + dir[1];

      if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  };

  const runIteration = () => {
    const newBoard = createEmptyBoard();

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const neighbors = calculateNeighbors(board.get(), x, y);
        if (board.get()[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else if (!board.get()[y][x] && neighbors === 3) {
          newBoard[y][x] = true;
        }
      }
    }

    board.set(newBoard);
    setCells(createCells());
    setIsRunning(true);
  };

  const runGame = () => {
    setIsRunning(true);
  };

  const stopGame = () => {
    setIsRunning(false);
  };

  const reset = () => {
    if (isRunning) {
      setIsRunning(false);
    }
    board.set(createEmptyBoard());
    setCells([]);
  };

  const handleIntervalChange = event => {
    setDelay(parseInt(event.target.value));
  };

  const handleRandomize = () => {
    let newBoard = createEmptyBoard();
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        newBoard[y][x] = Math.random() >= 0.5;
      }
    }
    board.set(newBoard);
    setCells(createCells());
  };

  useInterval(
    () => {
      runIteration();
    },
    isRunning ? delay : null
  );

  return (
    <>
      <div
        className='board'
        style={{
          width: width,
          height: height,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
        ref={boardRef}
      >
        {cells.map(cell => (
          <Cell
            x={cell.x}
            y={cell.y}
            key={`${cell.x},${cell.y}`}
            palette={palette}
            cellSize={cellSize}
            transition={delay}
          />
        ))}
      </div>
      <div className='controls'>
        <fieldset>
          <label htmlFor='interval'>Update every</label>
          <select
            name='interval'
            id='interval'
            onChange={e => {
              handleIntervalChange(e);
            }}
            defaultValue={500}
          >
            <option value='100'>🤯 0.1</option>
            <option value='200'>⏭️0.2</option>
            <option value='300'>⏩0.3</option>
            <option value='500'>🆒 0.5</option>
            <option value='1000'>⏪ 1</option>
          </select>
          <span>seconds</span>
          {isRunning ? (
            <button className='btn' onClick={() => stopGame()}>
              Pause
            </button>
          ) : cells.length ? (
            <button
              className='btn'
              disabled={!cells.length}
              onClick={() => runGame()}
            >
              Run
            </button>
          ) : (
            <button className='btn' onClick={() => handleRandomize()}>
              Generate
            </button>
          )}
          <button className='btn' onClick={() => reset()}>
            Clear
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Game;
