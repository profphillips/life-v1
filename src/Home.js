// home.js by John Phillips on 2021-04-17 revised 2021-04-18
// This implements John Conway's Game of Life rules.

import React, { useState, useEffect } from "react";

// ***** Main function *******************************************************
export default function Home(props) {
  let { xCellCount = 90, yCellCount = 50 } = props; // size of cells array
  let [cells, setCells] = useState([]); // 2d cells array
  const [isLoading, setIsLoading] = useState(false); // is page loading
  const [isRunning, setIsRunning] = useState(true); // is simulation running
  const [isColor, setIsColor] = useState(true); // colors or b/w
  const [delay, setDelay] = useState(1000); // amount of delay for redraws
  const [iteration, setIteration] = useState(0); // current iteration of sim
  const [maxIterations, setMaxIterations] = useState();
  const [isRandom, setIsRandom] = useState(true);
  const [currentSlot, setCurrentSlot] = useState(0);
  const zeroArray = new Array(yCellCount) // 2d array filled with zeros
    .fill(0)
    .map(() => new Array(xCellCount).fill(0));

  // Create a random array of cells when the app is started.
  useEffect(() => {
    getRandomBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ignore warning - empty dependency array [] so only executed once

  useEffect(() => {
    const fetchMaxIterations = async () => {
      const filename = "v1-life-max-iterations";
      const result =
        (await JSON.parse(window.localStorage.getItem(filename))) || 100;
      setMaxIterations(result);
    };
    fetchMaxIterations();
    console.log("max=", maxIterations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Automatically calculates the next generation in delay milliseconds.
  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => calcNextGen(), delay);
      return () => clearTimeout(timer);
    }
  });

  // Restarts the simulation after maxIterations.
  useEffect(() => {
    if (iteration >= maxIterations) {
      isRandom ? getRandomBoard() : getLocalBoard(currentSlot);
    }
  });

  // Save current array to local storage.
  async function localSaveData(slot = 0) {
    const filename = "v1life" + slot;
    window.localStorage.setItem(filename, JSON.stringify(cells));
  }

  // Prepare to save array to local storage.
  async function saveLocalBoard(slot = 0) {
    setIsLoading(true);
    await localSaveData(slot);
    setIteration(0);
    setIsRandom(false);
    setCurrentSlot(slot);
    setIsLoading(false);
  }

  // Grab cell array data from the browser local storage. If none exist,
  // then return a 100x100 array of 0. Currently, 3 save slots are supported.
  async function localLoadData(slot = 0) {
    const filename = "v1life" + slot;
    const data = JSON.parse(window.localStorage.getItem(filename)) || zeroArray;
    return data;
  }

  // Prepare to load the cell array with locally saved data.
  async function getLocalBoard(slot = 0) {
    setIsLoading(true);
    const data = await localLoadData(slot);
    setCells(data);
    setIteration(0);
    setIsRandom(false);
    setCurrentSlot(slot);
    setIsLoading(false);
  }

  async function randomArray() {
    let newBoard = [];
    for (let y = 0; y < yCellCount; y++) {
      let row = [];
      for (let x = 0; x < xCellCount; x++) {
        Math.random() < 0.25 ? row.push(1) : row.push(0);
      }
      newBoard.push(row);
    }
    for (let y = 0; y < yCellCount; y++) {
      newBoard[y][0] = 0;
      newBoard[y][xCellCount - 1] = 0;
    }
    for (let x = 0; x < xCellCount; x++) {
      newBoard[0][x] = 0;
      newBoard[yCellCount - 1][x] = 0;
    }
    return newBoard;
  }

  async function getRandomBoard() {
    setIsLoading(true);
    const data = await randomArray();
    setCells(data);
    setIteration(0);
    setIsRandom(true);
    setIsLoading(false);
  }

  async function getClearBoard() {
    setIsLoading(true);
    setCells(zeroArray);
    setIteration(0);
    setIsLoading(false);
  }

  // Apply Conway's rules to a single cell to determine its fate.
  // 0 is dead and >= 1 is alive.
  function isAlive(row, col) {
    // count up the neighboring cells that are alive
    let neighbors = 0;
    if (row > 0 && row < yCellCount - 1 && col > 0 && col < xCellCount - 1) {
      if (cells[row - 1][col - 1] >= 1) {
        neighbors++;
      }
      if (cells[row - 1][col] >= 1) {
        neighbors++;
      }
      if (cells[row - 1][col + 1] >= 1) {
        neighbors++;
      }
      if (cells[row][col - 1] >= 1) {
        neighbors++;
      }
      if (cells[row][col + 1] >= 1) {
        neighbors++;
      }
      if (cells[row + 1][col - 1] >= 1) {
        neighbors++;
      }
      if (cells[row + 1][col] >= 1) {
        neighbors++;
      }
      if (cells[row + 1][col + 1] >= 1) {
        neighbors++;
      }
      // apply the rules to this cell
      if (cells[row][col] >= 1) {
        if (neighbors < 2 || neighbors > 3) {
          // this cell dies of loneliness or overcrowding
          return 0;
        } else {
          // this cell continues to live and grow older
          return cells[row][col] + 1;
        }
      } else if (neighbors === 3) {
        // this cell was dead but now is born
        return 1;
      }
    } else {
      // this cell dies - all perimeter cells are kept dead
      return 0;
    }
  }

  // Loop through cells array and apply Conway's rules to each cell
  function calcNextGen() {
    const nextGenCells = [];
    if (cells.length === yCellCount) {
      for (let y = 0; y < yCellCount; y++) {
        let row = [];
        for (let x = 0; x < xCellCount; x++) {
          row.push(isAlive(y, x));
        }
        nextGenCells.push(row);
      }
      setCells(nextGenCells);
      setIteration(iteration + 1);
    }
  }

  // When a cell is clicked, toggle on/off, then update cells array
  function handleCellClick(y, x) {
    const newCell = cells[y][x] > 0 ? 0 : 1;
    console.log("cell=", newCell);
    setCells((prevCells) => {
      const cells = [...prevCells];
      cells[y] = [...cells[y]];
      cells[y][x] = newCell;
      return cells;
    });
  }

  // Create a table to display the current state of the cells array
  function makeTable() {
    let tblBoard = [];
    let key = 0;
    // make sure the cells array is ready
    if (cells.length === yCellCount) {
      for (let y = 1; y < yCellCount - 1; y++) {
        let row = [];
        for (let x = 1; x < xCellCount - 1; x++) {
          ++key;
          // create a cell with the proper css background color
          let classes = "cell";
          const count = cells[y][x];
          if (isColor && count < 7) {
            classes += " cell-" + count;
          } else if (isColor && count >= 7) {
            classes += " cell-7";
          } else if (count === 0) {
            classes += " cell-0";
          } else if (count >= 1) {
            classes += " cell-1";
          }
          // add the clickable cell to the row array
          row.push(
            <td
              key={key}
              className={classes}
              onClick={() => handleCellClick(y, x)}
            />
          );
        }
        // add the row to the table array
        tblBoard.push(<tr key={y}>{row}</tr>);
      }
    }
    return (
      <table className="board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  return (
    <div>
      <div className="wrapper">
        {isLoading ? <div> Loading results...</div> : makeTable()}

        <div className="life-controls">
          <button
            onClick={() =>
              isRunning ? setIsRunning(false) : setIsRunning(true)
            }
          >
            {isRunning ? "Pause" : "Run"}
          </button>
          <button onClick={() => calcNextGen()}>Next</button>
          <button
            onClick={() => (isColor ? setIsColor(false) : setIsColor(true))}
          >
            {isColor ? "B/W" : "Color"}
          </button>
          <button onClick={() => setDelay(4000)}>Slow</button>
          <button onClick={() => setDelay(1000)}>Medium</button>
          <button onClick={() => setDelay(200)}>Fast</button>
          <button onClick={() => getClearBoard()}>Clear</button>
          <button onClick={() => getRandomBoard()}>Random</button>
          <button onClick={() => getLocalBoard(0)}>Load-0</button>
          <button onClick={() => saveLocalBoard(0)}>Save-0</button>
          <button onClick={() => getLocalBoard(1)}>Load-1</button>
          <button onClick={() => saveLocalBoard(1)}>Save-1</button>
          <button onClick={() => getLocalBoard(2)}>Load-2</button>
          <button onClick={() => saveLocalBoard(2)}>Save-2</button>
          <label>
            Iteration: {iteration}, Slot: {isRandom ? "Random" : currentSlot},
            MaxIterations: {maxIterations}
          </label>
        </div>
      </div>
    </div>
  );
}
// ***** End Main function ***************************************************
