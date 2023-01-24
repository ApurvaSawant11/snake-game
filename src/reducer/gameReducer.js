export const rows = 20;
export const columns = 30;

export const initialState = {
  mode: "NEW",
  snake: [
    [7, 15],
    [6, 15],
    [5, 15],
    [4, 15],
    [3, 15],
    [2, 15],
  ],
  direction: "RIGHT",
  foodCoordinates: [],
  foodName: "apple",
  foodTimestamp: null,
  snakeSpeed: 600,
  score: 0,
  bestScore: localStorage.getItem("Best-Score") ?? 0,
};

const moveSnakeToNewCell = ([x, y], direction) => {
  switch (direction) {
    case "RIGHT":
      return [x + 1, y];

    case "LEFT":
      return [x - 1, y];

    case "UP":
      return [x, y - 1];

    case "DOWN":
      return [x, y + 1];

    default:
      return [x, y];
  }
};

export const areCoordsEqual = ([x, y], [xFood, yFood]) =>
  x === xFood && y === yFood;

const isSnakeCollidesWithBody = (next, snake) => {
  const nextCoordinate = next.join();
  for (let i = 0; i < snake.length; i++) {
    if (nextCoordinate === snake[i].join()) {
      return true;
    }
  }
  return false;
};

const generateSnakeFood = () => {
  return [
    Math.floor(Math.random() * columns),
    Math.floor(Math.random() * rows),
  ];
};

const generateSnakeFoodName = () => {
  const snakeFood = [
    "apple",
    "grapes",
    "banana",
    "passionFruit",
    "kiwi",
    "strawberry",
  ];
  return snakeFood[Math.floor(Math.random() * snakeFood.length)];
};

const generateUserScore = (prevTimestamp) => {
  let difference = Date.now() - prevTimestamp;
  if (difference <= 5000) {
    return 20;
  } else if (difference > 5000 && difference <= 15000) {
    return 15;
  } else if (difference > 15000 && difference <= 25000) {
    return 10;
  } else if (difference > 25000 && difference <= 30000) {
    return 5;
  } else if (difference > 30000 && difference <= 40000) {
    return 3;
  } else if (difference > 40000 && difference < 50000) {
    return 1;
  } else {
    return 0;
  }
};

const findBestScore = (current, best) => {
  if (current > best) {
    localStorage.setItem("Best-Score", current);
    return current;
  }
  return best;
};

const moveSnake = (state) => {
  const nextHead = moveSnakeToNewCell(state.snake[0], state.direction);

  if (areCoordsEqual(nextHead, state.foodCoordinates)) {
    const {
      foodTimestamp: prevFoodTimestamp,
      score: prevScore,
      bestScore: prevBest,
    } = state;

    const newScore = prevScore + generateUserScore(prevFoodTimestamp);

    return {
      ...state,
      foodCoordinates: generateSnakeFood(),
      foodName: generateSnakeFoodName(),
      snake: [nextHead, ...state.snake],
      score: newScore,
      snakeSpeed: state.snakeSpeed - 15,
      foodTimestamp: Date.now(),
      bestScore: findBestScore(newScore, prevBest),
    };
  } else if (isSnakeCollidesWithBody(nextHead, state.snake)) {
    return {
      ...state,
      mode: "ENDED",
    };
  } else {
    const snakeDuplicate = [...state.snake];
    snakeDuplicate.pop();
    return { ...state, snake: [nextHead, ...snakeDuplicate] };
  }
};

const isSnakeOutOfGrid = ([x, y]) =>
  x < 0 || x >= columns || y < 0 || y >= rows;

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...initialState,
        mode: "ON",
        foodCoordinates: generateSnakeFood(),
        foodTimestamp: Date.now(),
      };

    case "PAUSE":
      return { ...state, mode: "PAUSED" };

    case "RESUME":
      return { ...state, mode: "ON" };

    case "GAME_OVER":
      return { ...state, mode: "ENDED" };

    case "TICK":
      const newState = moveSnake(state);

      if (isSnakeOutOfGrid(newState.snake[0])) {
        return { ...state, mode: "ENDED" };
      } else {
        return newState;
      }

    case "KEYPRESS":
      const directionKeys = {
        ArrowUp: "UP",
        ArrowRight: "RIGHT",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
      };

      // Track reverse direction for the snake
      const reverseDirection = {
        ArrowUp: "DOWN",
        ArrowRight: "LEFT",
        ArrowDown: "UP",
        ArrowLeft: "RIGHT",
      };

      if (
        Object.keys(directionKeys).includes(action.payload) &&
        reverseDirection[action.payload] !== state.direction &&
        state.mode === "ON"
      ) {
        return moveSnake({
          ...state,
          direction: directionKeys[action.payload],
        });
      } else {
        return state;
      }

    case "CHANGE_FOOD":
      return {
        ...state,
        foodCoordinates: generateSnakeFood(),
        foodName: generateSnakeFoodName(),
        foodTimestamp: Date.now(),
      };

    default:
      return state;
  }
};
