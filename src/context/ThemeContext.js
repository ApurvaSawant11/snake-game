import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(
    () => setTheme(localStorage.getItem("Snake-game-theme") ?? "light"),
    []
  );

  const changeTheme = () => {
    localStorage.setItem(
      "Snake-game-theme",
      theme === "dark" ? "light" : "dark"
    );
    setTheme(localStorage.getItem("Snake-game-theme"));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
