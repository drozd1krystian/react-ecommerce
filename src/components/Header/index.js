import React from "react";
import "./style.scss";
import { BsBag } from "react-icons/bs";

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">
        <h2>E-commerce</h2>
      </div>
      <ul className="links">
        <li>
          <a href="/signin" className="btn-dark link">
            <span>Sign In</span>
          </a>
        </li>
        <li>
          <a href="/ref" className="btn-light link">
            <span>Register</span>
          </a>
        </li>
        <li>
          <a href="/ref" className="btn-light link cart-link">
            <span>
              <BsBag />
            </span>
            <div className="cart"></div>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
