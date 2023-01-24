import { useGame } from "../../context/GameContext";
import { rows, columns, areCoordsEqual } from "../../reducer/gameReducer";
import "./gameBoard.css";

const Cell = ({ coordinates }) => {
  const { snake, direction, foodCoordinates, foodName } = useGame();
  const classNames = ["cell"];

  if (snake.find((item) => areCoordsEqual(item, coordinates))) {
    if (snake[0].join() === coordinates.join()) {
      classNames.push(`bg-sizing snake-head rotate-${direction.toLowerCase()}`);
    } else classNames.push("bg-sizing snake");
  }

  if (areCoordsEqual(coordinates, foodCoordinates)) {
    classNames.push(`bg-sizing ${foodName}`);
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

      <div className="grid-container">
        <section className="grid">
          {[...Array(rows)].map((_, idx) => (
            <Row key={idx} yCoord={idx} />
          ))}
        </section>
      </div>
    </main>
  );
};

export { GameBoard };
