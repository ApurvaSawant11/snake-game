import logoBlack from "../../images/logoBlack.svg";
import logoWhite from "../../images/logoWhite.svg";
import "./header.css";
import { FaMoon as MoonIcon, FaSun as SunIcon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Header = ({ setShowRulesModal }) => {
  const { theme, changeTheme } = useTheme();
  return (
    <header>
      <img
        src={theme === "light" ? logoBlack : logoWhite}
        alt="Snake Game"
        className="px-1 logo"
      />
      <div className="flex-row-center px-1">
        {theme === "light" ? (
          <MoonIcon className="moon-btn px-1" onClick={() => changeTheme()} />
        ) : (
          <SunIcon className="moon-btn px-1" onClick={() => changeTheme()} />
        )}
        <button
          onClick={() => setShowRulesModal(true)}
          className="round-btn question-btn"
        >
          ?
        </button>
      </div>
    </header>
  );
};

export { Header };
