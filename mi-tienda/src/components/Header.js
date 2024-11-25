import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="menu">
      <div className="logo">
        <img src="ruta/a/logo.png" alt="Logo" />
        <span>Tienda React</span>
      </div>
      <nav>
        <ul className="menu-items">
          <li><Link to="/">Inicio</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
