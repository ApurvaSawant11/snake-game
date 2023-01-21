import { useState } from "react";
import logo from "../../images/logo.svg";
import "./header.css";

const Header = () => {
  return (
    <header>
      <img src={logo} />
    </header>
  );
};

export { Header };
