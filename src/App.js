import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 50;
const numCols = 50;

function App() {
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const runningRef = useRef(running);
  runningRef.current = running;
  const gridClick = (i, k) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[i][k] = !gridCopy[i][k];
    });
    setGrid(newGrid);
  };

  const simulate = useCallback(() => {
    // Using a ref ensures the value is up to date in the callback
    if (!runningRef.current) {
      return;
    }

    setTimeout(simulate, 1000);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          simulate();
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols},20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                gridClick(i, k);
              }}
              style={{
                width: 18,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
