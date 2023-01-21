import logo from "../../images/logo.svg";
import "./header.css";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Snake Game" />
    </header>
  );
};

export { Header };
