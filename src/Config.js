import React, { useState, useEffect } from "react";
import Footer from "./Footer";

// add import/export and set colors
export default function Config(props) {
  const [maxIterations, setMaxIterations] = useState();
  let { xCellCount = 90, yCellCount = 50 } = props; // size of cells array
  let [cells, setCells] = useState([]); // 2d cells array
  useEffect(() => {
    const fetchMaxIterations = async () => {
      const result = await JSON.parse(
        window.localStorage.getItem("v1-life-max-iterations")
      );
      setMaxIterations(result);
    };
    fetchMaxIterations();
    console.log("max=", maxIterations);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function localSaveMaxIterations(iterations) {
    setMaxIterations(iterations);
    const filename = "v1-life-max-iterations";
    window.localStorage.setItem(filename, JSON.stringify(iterations));
    console.log("local save max=", iterations);
  }

  useEffect(() => {
    const fetchLocalData = () => {
      const filename = "v1life0";
      const data = JSON.parse(window.localStorage.getItem(filename));
      setCells(data);
    };
    fetchLocalData();
    console.log("json:", JSON.stringify(cells));
  }, []);

  const [maxIt, handleChange, reset] = useInputState(maxIterations);
  let j = JSON.stringify(cells);
  return (
    <>
      <section>
        <h3 id="config">Config</h3>
        <p>Conway's Game of Life by John Phillips on April 19, 2021.</p>
      </section>
      <hr />
      <section>
        <p>Current Max Iterations = {maxIterations}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localSaveMaxIterations(maxIt);
            reset();
          }}
        >
          <input
            name="maxIt"
            type="number"
            placeholder="Max Iterations value"
            value={maxIt || ""}
            onChange={handleChange}
            required={true}
            autoComplete="off"
          />
          <button type="submit">Submit</button>
        </form>
      </section>

      <hr />
      <section>
        set the color palette
        <ul style={{ listStyleType: "none" }}>
          <li>
            color-0: <input></input>
          </li>
          <li>
            color-1: <input></input>
          </li>
          <li>
            color-2: <input></input>
          </li>
          <li>
            color-3: <input></input>
          </li>
          <li>
            color-4: <input></input>
          </li>
          <li>
            color-5: <input></input>
          </li>
          <li>
            color-6: <input></input>
          </li>
          <li>
            color-7: <input></input>
          </li>
          <li>
            color-8: <input></input>
          </li>
        </ul>
        <button type="submit">Submit</button>
      </section>
      <hr />
      <section>
        <p>Current board: board-0</p>
        <p>
          Import: <button>board-0</button> <button>board-1</button>{" "}
          <button>board-2</button>
        </p>

        <textarea rows="20" cols="185" value={j}></textarea>
        <p>Save as: {" "}
          <button type="submit">board-0</button>{" "}
          <button type="submit">board-1</button>{" "}
          <button type="submit">board-2</button>
        </p>
      </section>
      <hr />
      <Footer />
    </>
  );
}

// Utility functions to fill in a text field as the user types;
// resets the text field to initialVal after the user presses enter
function useInputState(initialVal) {
  const [value, setValue] = useState(initialVal);
  const handleChange = (e) => setValue(e.target.value);
  const reset = () => setValue("");
  return [value, handleChange, reset];
}
