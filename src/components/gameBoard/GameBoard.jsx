import { useGame } from "../../context/GameContext";
import { rows, columns, isFoodCaptured } from "../../reducer/gameReducer";
import "./gameBoard.css";

const Cell = ({ coordinates }) => {
  const { snake, foodCoordinates, foodName } = useGame();
  const classNames = ["cell"];

  if (!!snake.find((item) => isFoodCaptured(item, coordinates))) {
    classNames.push("snake");
  }

  if (isFoodCaptured(coordinates, foodCoordinates)) {
    classNames.push(foodName);
  }

  return <div className={classNames.join(" ")}></div>;
};

const Row = ({ yCoord }) => {
  return (
    <div className="row">
      {[...Array(columns)].map((_, xCoord) => (
        <Cell key={xCoord} coordinates={[xCoord, yCoord]} />
      ))}
    </div>
  );
};

const GameBoard = () => {
  const { score, bestScore } = useGame();
  return (
    <main className="flex-column-center mt-1">
      <section className="scores">
        <div>
          Current Score
          <span className="score">{score}</span>
        </div>
        <div>
          Best Score
          <span className="score">{bestScore}</span>
        </div>
      </section>

      <section className="grid">
        {[...Array(rows)].map((_, idx) => (
          <Row key={idx} yCoord={idx} />
        ))}
      </section>
    </main>
  );
};

export { GameBoard };
