import "../gameStatusModal/gameStatusModal.css";
import { GiBeveledStar as Star } from "react-icons/gi";

const RulesModal = ({ setShowRulesModal }) => {
  return (
    <div className="basic-modal flex-row-center show">
      <div className="rules-modal border-2 mx-auto m-1p5 pt-1">
        <h2 className="text-center py-1">
          <Star className="px-1" />
          Rules
          <Star className="px-1" />
        </h2>
        <div className="modal-body p-2 pb-1 flex-column-center">
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
        <div className="text-center py-1">
          <button
            className="btn orange-btn"
            onClick={() => setShowRulesModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export { RulesModal };
