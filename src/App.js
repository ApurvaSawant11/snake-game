import "./App.css";
import { GameBoard, GameControls, Header } from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <GameBoard />
      <GameControls />
    </div>
  );
}

export default App;
