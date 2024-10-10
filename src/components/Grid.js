import React, { useEffect, useState } from "react";
import { FaPlay, FaFlag } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { GiMaze } from "react-icons/gi";
import { ReactTyped } from "react-typed";

const Grid = () => {
  const [grid, configureGrid] = useState({
    row: 0,
    column: 0,
  });

  const [gridTemp, configureGridTemp] = useState({
    row: 0,
    column: 0,
  });

  const [map, setMap] = useState([]);
  const [minPath, setMinPath] = useState([]);
  const [hardness, setHardness] = useState(0.3);

  useEffect(() => {
    try {
      // console.log(grid);
      if (
        gridTemp &&
        gridTemp.row &&
        gridTemp.column &&
        !isNaN(gridTemp.row) &&
        !isNaN(gridTemp.column) &&
        gridTemp.row > 0 &&
        gridTemp.column > 0
      ) {
        setMap(() => {
          const newMap = [];
          const numRows = parseInt(gridTemp.row, 10);
          const numColumns = parseInt(gridTemp.column, 10);
          if (numRows > 0 && numColumns > 0) {
            for (let i = 0; i < numRows; i++) {
              newMap.push(new Array(numColumns).fill(0));
            }
            newMap[0][0] = -1;
            newMap[numRows - 1][numColumns - 1] = -2;
          }
          return newMap;
        });
      } else {
        console.error("Invalid grid dimensions.");
      }

      configureGrid(gridTemp);
    } catch (err) {
      console.error("Error configuring grid:", err);
    }
  }, [grid, gridTemp]);

  const changeHandler = (event) => {
    const { id, value } = event.target;
    configureGridTemp((prevGrid) => ({
      ...prevGrid,
      [id]: parseInt(value, 10), // Parse the value to ensure it's a number
    }));
  };

  const gridHandler = (i, j) => {
    try {
      if ((i === 0 && j === 0) || (i === grid.row - 1 && j === grid.column - 1))
        return;
      if (minPath.length !== 0) setMinPath([]);

      const updatedMap = [...map];
      updatedMap[i][j] = updatedMap[i][j] === 0 ? 1 : 0;
      setMap(updatedMap);
    } catch (err) {
      console.error("Error updating grid:", err);
    }
  };

  const resetGrid = () => {
    setMap([]);
    setMinPath([]);
    configureGrid({
      row: 0,
      column: 0,
    });
  };

  const generateGrid = () => {
    if (!map || map.length === 0) {
      return (
        <div className="text-center bg-slate-950">
          <ReactTyped
            className=" text-white text-xl"
            strings={["Choose correct Rows and Column Input..."]}
            typeSpeed={20}
          ></ReactTyped>
        </div>
      );
    }
    const rows = [];
    for (let i = 0; i < grid.row; i++) {
      const columns = [];
      for (let j = 0; j < grid.column; j++) {
        let content = null;
        let iconSize = 20;
        if (map[i][j] === -1) {
          content = <FaPlay className=" scale-125" size={iconSize} />;
        } else if (map[i][j] === -2) {
          content = <FaFlag className=" scale-125" size={iconSize} />;
        }
        let classNames =
          "w-full max-w-20 flex justify-center items-center text-center aspect-square border border-slate-600 cursor-pointer hover:border-2 hover:border-white ";
        if (minPath.some(([x, y]) => x === i && y === j)) {
          classNames += " bg-green-500";
        } else if (map[i][j] === 1) {
          classNames += " bg-red-500";
        }
        classNames += "";
        columns.push(
          <div
            key={`${i}-${j}`}
            onClick={() => gridHandler(i, j)}
            className={classNames}
          >
            {content}
          </div>
        );
      }
      rows.push(
        <div key={i} className="flex justify-center ">
          {columns}
        </div>
      );
    }
    return rows.length ? rows : <div></div>;
  };

  const findPath = () => {
    const matrix = [...map];
    const size = grid.row;
    const dx = [1, 0, 0, -1];
    const dy = [0, 1, -1, 0];
    const ans = [];

    const isValid = (x, y) => {
      return (
        x >= 0 && x < size && y >= 0 && y < grid.column && matrix[x][y] !== 1
      );
    };

    const bfs = () => {
      const q = [];
      const visited = Array.from(Array(size), () => Array(size).fill(false));
      const parent = Array.from(Array(size), () => Array(size).fill([-1, -1]));

      q.push([0, 0]);
      visited[0][0] = true;

      while (q.length > 0) {
        const [x, y] = q.shift();

        if (x === grid.row - 1 && y === grid.column - 1) break;

        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (isValid(nx, ny) && !visited[nx][ny]) {
            q.push([nx, ny]);
            visited[nx][ny] = true;
            parent[nx][ny] = [x, y];
          }
        }
      }

      if (!visited[grid.row - 1][grid.column - 1]) return false;

      let x = grid.row - 1;
      let y = grid.column - 1;

      while (x !== -1 && y !== -1) {
        ans.push([x, y]);
        const [px, py] = parent[x][y];
        x = px;
        y = py;
      }

      ans.reverse();
      return true;
    };

    if (!bfs()) {
      console.error("No path exists!");
      toast("No path exists!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    // console.log(ans);

    setMinPath(ans);
  };

  const generateRandomBlockages = () => {
    const numRows = grid.row;
    const numColumns = grid.column;
    const newMap = [];

    if (numColumns === 0 || numRows === 0) return;

    setMinPath([]);

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numColumns; j++) {
        // Logic to determine blockages based on hardness
        if (Math.random() < hardness) {
          row.push(1); // Blockage
        } else {
          row.push(0); // Empty space
        }
      }
      newMap.push(row);
    }

    newMap[0][0] = -1; // Start
    newMap[numRows - 1][numColumns - 1] = -2; // End

    setMap(newMap);
  };

  return (
    <div className="w-full bg-slate-950 text-white  flex flex-col justify-center items-center">
      <div>
        <Toaster />
      </div>
      <div className="text-4xl flex gap-4  text-white font-bold text-center mt-3">
        <GiMaze className="text-5xl" />
        Maze Mastermind
      </div>
      <div className="font-bold text-xl ">
        <ReactTyped
          className="bg-slate-900 w-full"
          strings={["Grid Builder", "Grid Solver"]}
          typeSpeed={130}
          backSpeed={50}
          loop
        ></ReactTyped>
      </div>
      <div className="w-[90%] h-[2px] bg-slate-600 my-2 "></div>
      <div className="flex w-full gap-x-5 gap-y-5 flex-wrap justify-center items-center ">
        <div className="flex flex-col gap-2">
          <label className="flex gap-10 justify-center items-center flex-wrap shadow p-2 rounded-lg">
            <span className="mx-2 text-xl font-bold">Row</span>
            <input
              type="number"
              className=" bg-gray-700 w-28 px-2 text-xl text-center font-bold rounded-md"
              onChange={changeHandler}
              id="row"
              value={gridTemp.row}
            />
          </label>

          <label className="flex gap-2 justify-center items-center flex-wrap shadow p-2 rounded-lg">
            <span className="mx-2 text-xl font-bold">Column</span>
            <input
              type="number"
              className=" bg-gray-700 w-28 px-2 text-xl text-center font-bold rounded-md"
              onChange={changeHandler}
              id="column"
              value={gridTemp.column}
            />
          </label>
        </div>

        <div className="px-4 py-3 flex flex-col items-center gap-2  border-4 border-dashed rounded-xl bg-slate-900 my-4">
          <div className="flex gap-x-2 items-center">
            <span className="text-xl font-bold">Level </span>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              className="bg-gray-700 w-28 px-2 text-xl font-bold rounded-md"
              onChange={(e) => {
                setHardness(parseFloat(e.target.value));
              }}
            />
          </div>
          <button
            className=" w-fit px-2 py-1 rounded-xl font-bold bg-green-700 hover:bg-green-800 hover:scale-105 transition-all duration-300"
            onClick={() => generateRandomBlockages(hardness)}
          >
            Random Blocks
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-500 font-bold text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-300"
            onClick={findPath}
          >
            Find Path
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 font-bold hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded-md"
            onClick={resetGrid}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-full my-2 px-10 bg-gray-950">{generateGrid()}</div>
    </div>
  );
};

export default Grid;
