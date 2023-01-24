import { createContext, useContext, useEffect, useReducer } from "react";
import { gameReducer, initialState } from "../reducer/gameReducer";
import useInterval from "../hooks/useInterval";
import useFoodTimeout from "../hooks/useFoodTimeout";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const onKeyPress = ({ code }) => {
    dispatch({ type: "KEYPRESS", payload: code });
  };

  useFoodTimeout(
    () => {
      dispatch({ type: "CHANGE_FOOD" });
    },
    50000,
    state.foodName,
    state.mode === "ON"
  );

  useInterval(
    () => {
      dispatch({ type: "SHOW_FOOD", payload: true });
    },
    state.showFood ? null : 3000,
    state.mode === "ON"
  );

  useInterval(
    () => {
      dispatch({ type: "TICK" });
    },
    state.snakeSpeed,
    state.mode === "ON"
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  const value = {
    mode: state.mode,
    snake: state.snake,
    direction: state.direction,
    foodCoordinates: state.foodCoordinates,
    showFood: state.showFood,
    foodName: state.foodName,
    foodTimestamp: state.foodTimestamp,
    snakeSpeed: state.snakeSpeed,
    score: state.score,
    bestScore: state.bestScore,
    dispatch: dispatch,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
