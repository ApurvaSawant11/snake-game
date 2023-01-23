import "./gameControls.css";
import { useGame } from "../../context/GameContext";

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
    </section>
  );
};

export { GameControls };
