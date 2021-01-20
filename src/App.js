import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import useWindowDimensions from "./hooks/useWindowDimensions";
import Footer from "./components/Footer";

function App() {
  const windowDems = useWindowDimensions();
  const [config, setConfig] = useState({});
  const [gameGenerated, setGameGenerated] = useState(false);
  const [maxRange, setMaxRange] = useState(windowDems);
  const {
    height = maxRange.y * 0.75,
    width = maxRange.x * 0.75,
    cellSize = 15,
    palette = "vapor",
  } = config;

  useEffect(() => {
    if (!gameGenerated) {
      setMaxRange(windowDems);
    }
  }, [gameGenerated, windowDems]);

  return (
    <div className='App'>
      <div className='App-content'>
        <h1>Conway's Game of Life Vizualizer</h1>
        {gameGenerated ? (
          ""
        ) : (
          <>
            <p className='blurb bg-transparent'>
              <a
                href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
                target='_blank'
                rel='noopener noreferrer'
              >
                The Game of Life
              </a>{" "}
              is a cellular automaton devised by the British mathematician John
              Conway in 1970. This app generates a board and then randomly
              creates starting organisms before playing out iterations of the
              game based on the rules that make up the Game of Life:
            </p>
            <ul className='rules bg-transparent'>
              <li>Any live cell with two or three live neighbours survives.</li>
              <li>
                Any dead cell with three live neighbours becomes a live cell.
              </li>
              <li>
                All other live cells die in the next generation. Similarly, all
                other dead cells stay dead.
              </li>
            </ul>
          </>
        )}
        <div className='game--container' style={{ minHeight: height }}>
          {gameGenerated ? (
            <>
              <Game
                height={parseInt(height)}
                width={parseInt(width)}
                cellSize={parseInt(cellSize)}
                palette={palette}
              />
              <button
                className='btn'
                onClick={() => {
                  setConfig({});
                  setGameGenerated(false);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Create A New Board
              </button>
            </>
          ) : (
            <>
              <div className='generator-controls'>
                <fieldset className='select-group'>
                  <label htmlFor='palette'>
                    Choose your organism color palette:
                  </label>
                  <select
                    name='palette'
                    id='palette'
                    onChange={e => {
                      setConfig({ ...config, palette: e.target.value });
                    }}
                  >
                    <option value='vapor'>Vaporwave</option>
                    <option value='outrun'>Outrun</option>
                    <option value='kawaii'>Kawaii</option>
                    <option value='neon'>Neon</option>
                    <option value='summer'>Summer</option>
                    <option value='clouds'>Clouds</option>
                  </select>
                </fieldset>
                <fieldset className='input-group'>
                  <div>
                    <label htmlFor='height'>Height of grid:</label>
                    <input
                      type='number'
                      id='height'
                      name='height'
                      min='100'
                      max={parseInt(maxRange.y * 0.8)}
                      defaultValue={parseInt(maxRange.y * 0.8)}
                      onChange={e => {
                        setConfig({
                          ...config,
                          height: e.target.value * 0.8,
                        });
                      }}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor='width'>Width of grid:</label>
                    <input
                      type='number'
                      id='width'
                      name='width'
                      min='100'
                      max={parseInt(maxRange.x * 0.8)}
                      defaultValue={parseInt(maxRange.x * 0.8)}
                      onChange={e => {
                        setConfig({
                          ...config,
                          width: e.target.value * 0.8,
                        });
                      }}
                    ></input>
                  </div>

                  <span>
                    (maximums are automatically calculated based on your screen
                    size)
                  </span>
                  <div>
                    <label htmlFor='cellsize'>Size of each square:</label>
                    <input
                      type='number'
                      id='cellsize'
                      name='cellsize'
                      min='12'
                      max='50'
                      defaultValue={15}
                      onChange={e => {
                        setConfig({
                          ...config,
                          cellSize: e.target.value,
                        });
                      }}
                    ></input>
                  </div>
                </fieldset>
              </div>

              <p className='bg-transparent'>
                Select your options and create a board
              </p>
              <button
                className='btn'
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setGameGenerated(true);
                }}
              >
                Create Board!
              </button>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
