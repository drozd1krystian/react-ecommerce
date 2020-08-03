import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { BsBag } from "react-icons/bs";

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h2>E-commerce</h2>
        </Link>
      </div>
      <ul className="links">
        <li>
          <Link to="/registration" className="btn-light link">
            <span>Sign In</span>
          </Link>
        </li>
        <li>
          <Link to="/registration" className="btn-dark link">
            <span>Register</span>
          </Link>
        </li>
        <li>
          <Link to="/cart" className="btn-dark link cart-link">
            <span>
              <BsBag />
            </span>
            <div className="cart"></div>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
