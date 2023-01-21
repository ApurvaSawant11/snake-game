import "./gameControls.css";
import { GiBeveledStar as Star } from "react-icons/gi";
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
        className="control-btn"
        onClick={() => dispatch({ type: gameMode[mode] })}
      >
        {gameMode[mode]}
      </button>

      <div>
        <h3 className="flex-row-center ">
          <Star className="px-1" />
          Rules
          <Star className="px-1" />
        </h3>
        <ul>
          <li>Use arrow keys to control the direction of the snake.</li>
          <li>
            If the snake collides with the walls or with its body, the game
            ends.
          </li>
          <li>Speed of the snake increases when you collect food.</li>
          <li>Score is calculated based on how fast you collect the food.</li>
        </ul>
      </div>
    </section>
  );
};

export { GameControls };
