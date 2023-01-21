import { useState } from "react";
import "./gameBoard.css";

const Cell = () => {
  return <div className="cell"></div>;
};

const Row = () => {
  return (
    <div className="row">
      {[...Array(30)].map((_, index) => (
        <Cell key={index} />
      ))}
    </div>
  );
};

const GameBoard = () => {
  return (
    <main className="flex-column-center mt-1">
      <section className="scores">
        <div>
          Current Score
          <span className="score">10</span>
        </div>
        <div>
          Best Score
          <span className="score">10</span>
        </div>
      </section>

      <section className="grid">
        {[...Array(20)].map((_, idx) => (
          <Row key={idx} />
        ))}
      </section>
    </main>
  );
};

export { GameBoard };
