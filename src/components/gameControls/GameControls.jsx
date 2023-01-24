import "./gameControls.css";
import { useGame } from "../../context/GameContext";
import {
  TfiArrowCircleLeft as Left,
  TfiArrowCircleRight as Right,
  TfiArrowCircleUp as Up,
  TfiArrowCircleDown as Down,
} from "react-icons/tfi";

const GameControls = () => {
  const gameMode = {
    NEW: "START",
    ON: "PAUSE",
    PAUSED: "RESUME",
    ENDED: "START",
  };

  const { mode, dispatch } = useGame();

  return (
    <section className="controls">
      <button
        className={`btn ${
          gameMode[mode] === "START" ? "blue-btn" : "orange-btn"
        } `}
        onClick={() => dispatch({ type: gameMode[mode] })}
      >
        {gameMode[mode]}
      </button>

      <div className="flex-column-center pt-1 mobile-arrows">
        <Up
          className="mobile-arrow"
          onClick={() => dispatch({ type: "KEYPRESS", payload: "ArrowUp" })}
        />
        <div className="arrow-set">
          <Left
            className="mobile-arrow"
            onClick={() => dispatch({ type: "KEYPRESS", payload: "ArrowLeft" })}
          />
          <Right
            className="mobile-arrow"
            onClick={() =>
              dispatch({ type: "KEYPRESS", payload: "ArrowRight" })
            }
          />
        </div>
        <Down
          className="mobile-arrow"
          onClick={() => dispatch({ type: "KEYPRESS", payload: "ArrowDown" })}
        />
      </div>
    </section>
  );
};

export { GameControls };
