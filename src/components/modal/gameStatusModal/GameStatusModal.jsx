import { useGame } from "../../../context/GameContext";
import "./gameStatusModal.css";

const GameStatusModal = ({ mode }) => {
  const { score, bestScore, dispatch } = useGame();

  const restartHandler = () => {
    dispatch({ type: "START" });
  };

  return (
    <div className={`basic-modal flex-row-center show`}>
      <div className="modal border-2 mx-auto m-1p5 py-1">
        {mode === "PAUSED" && (
          <>
            <h2 className="text-center p-2">Paused</h2>
            <div className="text-center p-1">
              <div className="flex-row-center">
                <button className="btn blue-btn" onClick={restartHandler}>
                  Restart
                </button>
                <button
                  className="btn orange-btn"
                  onClick={() => {
                    dispatch({ type: "RESUME" });
                  }}
                >
                  Resume
                </button>
              </div>
            </div>
          </>
        )}

        {mode === "ENDED" && (
          <>
            <h2 className="text-center">Game Over</h2>
            <div className="modal-body py-1 flex-column-center">
              <span>Score: {score}</span>
              <span>Best Score: {bestScore}</span>
            </div>
            <div className="text-center">
              <button className="btn blue-btn" onClick={restartHandler}>
                Play Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { GameStatusModal };
