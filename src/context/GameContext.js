import { createContext, useContext, useEffect, useReducer } from "react";
import { gameReducer, initialState } from "../reducer/gameReducer";
import useInterval from "../hooks/useInterval";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const onKeyPress = ({ code }) => {
    dispatch({ type: "KEYPRESS", payload: code });
  };

  useInterval(
    () => {
      dispatch({ type: "TICK" });
    },
    500,
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
    foodName: state.foodName,
    dispatch: dispatch,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
