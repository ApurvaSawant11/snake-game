import "./App.css";
import {
  GameBoard,
  GameControls,
  GameStatusModal,
  Header,
  RulesModal,
} from "./components";
import { useState } from "react";
import { useGame } from "./context/GameContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { mode } = useGame();
  const [showRulesModal, setShowRulesModal] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="App" data-theme={theme}>
      <Header setShowRulesModal={setShowRulesModal} />
      <GameBoard />
      <GameControls />
      {(mode === "PAUSED" || mode === "ENDED") && (
        <GameStatusModal mode={mode} />
      )}
      {showRulesModal && <RulesModal setShowRulesModal={setShowRulesModal} />}
    </div>
  );
}

export default App;
